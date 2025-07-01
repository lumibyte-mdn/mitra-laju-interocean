import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const data = await req.json()

    const shipmentCostings = await prisma.costings.findMany({
        where: {
            shipmentId: parseInt(data.shipmentId)
        }
    })

    return NextResponse.json({ success: true, shipmentCostings }, { status: 200 })
}