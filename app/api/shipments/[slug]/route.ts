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

export async function PUT(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "Unauthenticated user." }, { status: 401 })
    }

    const data = await req.json()

    const updateShipment = await prisma.shipments.update({
        where: {
            id: data.id
        },
        data: {
            orderNumber: data.orderNumber,
            customer: data.customer,
            shipper: data.shipper,
            dueDate: data.dueDate.split("T")[0] + "T00:00:00.000Z",
            customerCode: data.customerCode,
            qty: parseInt(data.qty.toString()),
            size: data.size,
            origin: data.origin,
            destination: data.destination,
            shipmentType: data.shipmentType,
            estimatedDate: data.estimatedDate.split("T")[0] + "T00:00:00.000Z",
            containerNumber: data.containerNumber,
            bookingNumber: data.bookingNumber
        }
    })

    return NextResponse.json({ success: true, message: "Shipment data successfully updated." }, { status: 201 })
}