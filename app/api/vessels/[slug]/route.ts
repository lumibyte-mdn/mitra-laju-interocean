import { prisma } from "@/lib/prisma";
import { currentDateTime } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json({ success: false, message: "Unauthorized." })
    }

    const vesselId = await req.url.split("/")[5]

    const vesselDetails = await prisma.vessels.findUnique({
        where: {
            id: vesselId
        }
    })

    return Response.json({ success: true, vesselDetails }, { status: 200})
}

export async function PUT(req: Request) {
    const { userId } = await auth()

    if (!userId) {
        return Response.json({ success: false, message: "Unauthorized."}, { status: 401 })
    }

    const user = await currentUser()

    const vesselId = await req.url.split("/")[5]
    const data = await req.formData()

    const updateVessel = await prisma.vessels.update({
        where: {
            id: vesselId
        },
        data: {
            vesselName: data.get("vesselName") as string,
            voyage: data.get("voyage") as string,
            etd: data.get("etd") === "" ? null : data.get("etd") + "T00:00:00.000Z",
            cutOffDate: data.get("cutOffDate") === "" ? null : data.get("cutOffDate") + "T00:00:00.000Z",
            updatedBy: `${user?.firstName} ${user?.lastName}`,
            updatedAt: currentDateTime()
        }
    })

    return Response.json({ success: true, message: "Vessel updated successfully."}, { status: 201 })
}