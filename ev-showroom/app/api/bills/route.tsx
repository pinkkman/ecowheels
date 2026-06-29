import { NextRequest, NextResponse } from "next/server";

import getBrowser from "@/lib/browser";
import InvoiceTemplate from "@/lib/invoiceTemplate";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const browser = await getBrowser();

    const page = await browser.newPage();


    const html = InvoiceTemplate(body);

await page.setContent(html)

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