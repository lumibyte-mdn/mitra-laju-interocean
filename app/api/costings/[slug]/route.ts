import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const costingId = await req.url.split("/")[5]

    const costingDetail = await prisma.costings.findUnique({
        where: {
            id: parseInt(costingId)
        }
    })

    const shipmentQty = await prisma.shipments.findUnique({
        where: {
            id: costingDetail?.shipmentId
        },
        select: {
            qty: true
        }
    })

    return NextResponse.json({ success: true, costingDetail, shipmentQty }, { status: 200 })
}

export async function PUT(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const costingId = await req.url.split("/")[5]

    const data = await req.json()

    const updateCosting = await prisma.costings.update({
        where: {
            id: parseInt(costingId)
        },
        data: {
            vendorName: data.vendorName,
            price: parseInt(data.price.toString()),
            currency: parseInt(data.currency.toString()),
            localFee: parseInt(data.localFee.toString()),
            freight: parseInt(data.freight.toString()),
            subCosting: (parseInt(data.currency.toString()) * parseInt(data.price.toString()) * data.shipmentQty) + parseInt(data.localFee.toString()) + parseInt(data.freight.toString()),
            reimbursement: parseInt(data.reimbursement.toString()),
            vat: data.vat,
            incomeTax: data.incomeTax,
            freightPaymentDate: data.freightPaymentDate.split("T")[0] + "T00:00:00.000Z"
        }
    })

    return NextResponse.json({success: true, message: "Successfully updated costing data."}, { status: 201 })
}