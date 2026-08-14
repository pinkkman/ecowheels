import { NextResponse } from "next/server";
import crypto from "crypto";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { redis } from "@/lib/redis";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        // Don't reveal whether an account exists
        if (!user) {
            return NextResponse.json({
                success: true,
                message: "If an account exists, a reset email has been sent.",
            });
        }

        // Generate secure random token
        const rawToken = crypto.randomBytes(32).toString("hex");

        // Hash token before storing it
        const hashedToken = crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");

        // Store token for 15 minutes
        await redis.set(
            `password-reset:${hashedToken}`,
            user._id.toString(),
            { ex: 900 }
        );

        const resetUrl =
            `${process.env.NEXTAUTH_URL}/reset-password?token=${rawToken}`;

        const { error } = await resend.emails.send({
            from: "EcoWheels <onboarding@resend.dev>",
            to: [normalizedEmail],
            subject: "Reset your EcoWheels password",
            html: `
        <h2>Reset your EcoWheels password</h2>

        <p>You requested a password reset.</p>

        <p>
          Click the button below to create a new password.
        </p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#16a34a;
            color:white;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>

        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
        });

        if (error) {
            console.error("Resend error:", error);

            return NextResponse.json(
                {
                    success: false,
                    message: "Could not send reset email",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "If an account exists, a reset email has been sent.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}