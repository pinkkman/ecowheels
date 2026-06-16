import cloudinary from "@/lib/cloudinary";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            {success: false},
            {status: 400}
        );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    return new Promise((resolve) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: "ev-showroom",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Failed:", error);
                    } else {
                        console.log(
                            "Cloudinary Upload Success:",
                            result?.secure_url
                        );
                    }

                    if (error) {
                        resolve(
                            NextResponse.json({
                                success: false,
                                error: String(error),
                            })
                        );
                        return;
                    }



                    resolve(
                        NextResponse.json({
                            success: true,
                            url: result?.secure_url,
                        })
                    );
                }
            )
            .end(buffer);
    });
}