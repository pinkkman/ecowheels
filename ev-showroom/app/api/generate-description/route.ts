import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { name, range, topSpeed, battery } = await req.json();
const prompt = `
You are a premium EV showroom copywriter.

Write a catchy scooter description using ONLY the details below.

Scooter Name: ${name}
Range: ${range} km
Top Speed: ${topSpeed} km/h
Battery: ${battery}

Rules:
- Maximum 35 words.
- Mention the scooter name naturally.
- Include the range, top speed, and battery.
- Keep the tone premium, smart, and modern.
- Add one subtle, clever line of humor if it fits naturally.
- Do NOT exaggerate or invent features.
- No emojis.
- No bullet points.
- Return only the description.
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