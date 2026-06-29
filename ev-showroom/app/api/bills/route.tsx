import { NextRequest, NextResponse } from "next/server";

import renderInvoice from "@/lib/renderVoice";
import getBrowser from "@/lib/browser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const html = renderInvoice(body);

    const browser = await getBrowser();

    const page = await browser.newPage();

    await page.setContent(html,{
        waitUntil:"networkidle0"
    });

    const pdf = await page.pdf({

        format:"A4",

        printBackground:true,

        margin:{
            top:"0",
            right:"0",
            bottom:"0",
            left:"0",
        }

    });

    await browser.close();

    return new NextResponse(pdf,{

        headers:{

            "Content-Type":"application/pdf",

            "Content-Disposition":`attachment; filename="${body.billNo}.pdf"`

        }

    });

}