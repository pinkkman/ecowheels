import { connectDB } from "@/lib/db";
import Scooter from "@/models/Scooter";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        const scooter = await Scooter.create(body);

        return NextResponse.json({
            success: true,
            scooter,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error,
            },
            {
                status: 500,
            }
        );
    }
}
export async function GET() {
    await connectDB();

    const scooters = await Scooter.find().sort({
        createdAt: -1,
    });

    return NextResponse.json({
        success: true,
        scooters,
    });
}
// export async function PUT(
//     req: Request,
//     { params }: { params: { id: string } }
// ) {
//     await connectDB();
//
//     const body = await req.json();
//
//     await Scooter.findByIdAndUpdate(
//         params.id,
//         body
//     );
//
//     return NextResponse.json({
//         success: true,
//      });
//  }