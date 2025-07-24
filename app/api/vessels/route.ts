import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Response) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json({ success: false, message: "Unauthorized." }, { status: 401 })
    }

    const user = await currentUser()
    const data = await req.formData()

    const createVessel = await prisma.vessels.create({
        data: {
            vesselName: data.get("vesselName") as string,
            voyage: data.get("voyage") as string,
            etd: data.get("etd") + "T00:00:00.000Z",
            cutOffDate: data.get("cutOffDate") == null ? null : data.get("cutOffDate") + "T00:00:00.000Z",
            createdBy: `${user?.firstName} ${user?.lastName}`
        }
    })

    return Response.json({ success: true, message: "New vessel created successfully." }, { status: 201 })
}

export async function GET() {
    const { userId } = await auth()

    if (!userId) {
        return Response.json({ success: false, message: "Unauthorized." }, { status: 401 })
    }

    const vessels = await prisma.vessels.findMany()

    return Response.json({ success: true, vessels }, { status: 200 })
}