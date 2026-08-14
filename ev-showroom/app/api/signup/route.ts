import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import {connectDB} from "@/lib/db";
export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, phone, email,password } = await req.json();

        if (!name || !phone ||!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ phone });
const existingEmail=await User.findOne({email});
if(existingEmail){
    return NextResponse.json({
        success: false,
        message: "Email already exists",
    }, { status: 400 }
) ;
    }


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
            email,
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