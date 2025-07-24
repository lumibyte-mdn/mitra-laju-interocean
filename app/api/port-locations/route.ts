import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json({ success: false, message: "Unauthorized." }, { status: 401 })
    }

    const user = await currentUser()
    const data = await req.formData()

    const createPort = await prisma.portLocations.create({
        data: {
            portName: data.get("portName") as string,
            country: data.get("country") as string,
            createdBy: `${user?.firstName} ${user?.lastName}`
        }
    })

    return Response.json({ success: true, message: "New port location created successfully." }, { status: 201 })
}

export async function GET() {
    const { userId } = await auth()

    if (!userId) {
        return Response.json({ success: false, message: "Unauthorized." })
    }

    const ports = await prisma.portLocations.findMany()

    return Response.json({ success: true, ports }, { status: 200 })
}