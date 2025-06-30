import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const data = await req.formData()

    console.log(data)

    return NextResponse.json({ success: true, message: "New Shipment data created successfully." }, { status: 201 })
}