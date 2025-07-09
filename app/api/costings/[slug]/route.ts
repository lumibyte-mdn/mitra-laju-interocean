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