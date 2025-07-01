import { ShipmentType } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const shipments = await prisma.shipments.findMany()

    return NextResponse.json({ success: true, shipments }, { status: 200 })
}

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const data = await req.formData()

    console.log(data)

    const createShipment = await prisma.shipments.create({
        data: {
            orderNumber: data.get("orderNumber") as string,
            customer: data.get("customer") as string,
            shipper: data.get("shipper") as string,
            dueDate: data.get("dueDate") + "T00:00:00.000Z",
            customerCode: data.get("customerCode") as string,
            qty: parseInt(data.get("qty") as string),
            size: data.get("size") as string,
            origin: data.get("origin") as string,
            destination: data.get("destination") as string,
            shipmentType: data.get("shipmentType") as ShipmentType,
            estimatedDate: data.get("estimatedDate") + "T00:00:00.000Z",
            containerNumber: data.get("containerNumber") as string,
            bookingNumber: data.get("bookingNumber") as string,
        }
    })

    return NextResponse.json({ success: true, message: "New Shipment data created successfully." }, { status: 201 })
}