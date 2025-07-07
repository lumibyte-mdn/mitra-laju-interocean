import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const shipmentId = await req.url.split("/")[5]

    const shipmentDetail = await prisma.shipments.findFirst({
        where: {
            id: parseInt(shipmentId)
        }
    })

    const costings = await prisma.costings.findMany({
        where: {
            shipmentId: parseInt(shipmentId)
        }
    })

    return NextResponse.json({ success: true, shipmentDetail, costings }, { status: 200 })
}