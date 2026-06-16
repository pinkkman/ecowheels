import { connectDB } from "@/lib/db";
import Scooter from "@/models/Scooter";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();

    const { id } = await params;

    const scooter = await Scooter.findById(id);

    return NextResponse.json({
        success: true,
        scooter,
    });

}
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();

    const { id } = await params;

    await Scooter.findByIdAndDelete(id);

    return NextResponse.json({
        success: true,
    });


}export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const scooter =
        await Scooter.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
            }
        );

    return NextResponse.json({
        success: true,
        scooter,
    });
}