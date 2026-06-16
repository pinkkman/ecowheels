import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import {connectDB} from "@/lib/db";
export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, phone, password } = await req.json();

        if (!name || !phone || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ phone });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Phone number already registered",
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            phone,
            password: hashedPassword,
            role: "user",
        });

        return NextResponse.json({
            success: true,
            message: "Account created successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}