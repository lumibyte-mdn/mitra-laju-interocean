import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "User unauthenticated." }, { status: 401 })
    }

    const data = await req.json()

    console.log(data)

    return NextResponse.json({ success: true }, { status: 200 })
}

export async function POST(req: NextRequest) {

}