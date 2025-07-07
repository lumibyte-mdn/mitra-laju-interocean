import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const data = await req.json()

    const createCosting = await prisma.costings.create({
        data: {
            shipmentId: parseInt(data.shipmentId),
            vendorName: data.vendorName,
            price: parseInt(data.price),
            currency: parseInt(data.currency),
            localFee: parseInt(data.localFee),
            freight: parseInt(data.freight),
            subCosting: data.subCosting,
            reimbursement: parseInt(data.reimbursement),
            vat: data.vat,
            incomeTax: data.incomeTax,
            freightPaymentDate: data.freightPaymentDate + "T00:00:00.000Z"
        }
    })

    return NextResponse.json({ success: true }, { status: 201 })
}