import { prisma } from "@/lib/prisma"
import { currentDateTime, dataCostingTotal } from "@/lib/utils"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function GET(req: Request) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json({ success: false, message: "Unauthorized." }, { status: 401 })
    }

    const portId = await req.url.split("/")[5]

    const portDetails = await prisma.portLocations.findUnique({
        where: {
            id: portId
        }
    })

    return Response.json({ success: true, portDetails }, { status: 200 })
}

export async function PUT(req: Request) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json({ success: false, message: "Unauthorized."}, { status: 401 })
    }

    const user = await currentUser()

    const portId = await req.url.split("/")[5]
    const data = await req.formData()

    const updatePortLocation = await prisma.portLocations.update({
        where: {
            id: portId
        },
        data: {
            portName: data.get("portName") as string,
            country: data.get("country") as string,
            updatedBy: `${user?.firstName} ${user?.lastName}`,
            updatedAt: `${currentDateTime()}`
        }
    })

    return Response.json({ success: true, message: "Port Location updated successfully."}, { status: 201})
}