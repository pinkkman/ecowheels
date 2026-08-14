import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token and password are required",
                },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password must be at least 6 characters",
                },
                { status: 400 }
            );
        }

        // Hash the token exactly like we did when storing it
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const redisKey = `password-reset:${hashedToken}`;

        // Get user ID stored against this token
        const userId = await redis.get<string>(redisKey);

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Reset link is invalid or expired",
                },
                { status: 400 }
            );
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        // Token can never be reused
        await redis.del(redisKey);

        return NextResponse.json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}