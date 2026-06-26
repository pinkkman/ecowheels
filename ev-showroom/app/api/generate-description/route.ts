import OpenAI from "openai";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { name, range, topSpeed, battery } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
 if (!apiKey) {
    return Response.json(
      { error: "GROQ_API_KEY is missing" },
      { status: 500 }
    );
  }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a professional EV showroom copywriter. Generate attractive scooter descriptions between 60 and 100 words.",
        },
        {
          role: "user",
          content: `
Scooter Name: ${name}
Range: ${range} km
Top Speed: ${topSpeed} km/h
Battery: ${battery}
`,
        },
      ],
    });

    return NextResponse.json({
      description:
        completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
  
}