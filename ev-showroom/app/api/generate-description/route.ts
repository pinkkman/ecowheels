import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { name, range, topSpeed, battery } = await req.json();

    const prompt = `
Generate a professional scooter showroom description.

Scooter Name: ${name}
Range: ${range} km
Top Speed: ${topSpeed} km/h
Battery: ${battery}

Keep it between 60-100 words.
Make it attractive and customer-friendly.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      description: response.text,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
}