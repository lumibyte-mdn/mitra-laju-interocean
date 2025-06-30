import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/lib/interface";
import clerkClient from "@clerk/clerk-sdk-node";

export async function PUT(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "Unauthenticated user." }, { status: 401 })
    }

    const personalUser = await prisma.users.findUnique({
        where: {
            clerkId: userId
        }
    })

    if (personalUser?.role != "ADMIN") {
        return NextResponse.json({ success: false, message: "You don't have permission to perform this action." }, { status: 400 })
    }

    const id = req.url.split("/")[5]
    const data = await req.formData()

    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (user == null) {
        return NextResponse.json({ message: "User not found." }, { status: 404 })
    }

    try {
        // Update clerk database
        const updateClerkUser = await clerkClient.users.updateUser(user.clerkId, {
            firstName: data.get("firstName") as string,
            lastName: data.get("lastName") as string,
            publicMetadata: {
                role: data.get("role") as UserRole
            }
        })

        // Update internal database
        const updateUser = await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: {
                firstName: data.get("firstName") as string,
                lastName: data.get("lastName") as string,
                email: data.get("email") as string,
                role: data.get("role") as UserRole
            }
        })

        return NextResponse.json({ success: true, message: "User updated successfully" }, { status: 201 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ success: false, message: "Failed to submit data. Something went wrong." }, { status: 500 })
    }

}

export async function GET(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "Unauthenticated user." }, { status: 401 })
    }

    const personalUser = await prisma.users.findUnique({
        where: {
            clerkId: userId
        }
    })

    if (personalUser?.role != "ADMIN") {
        return NextResponse.json({ message: "You don't have permission to perform this action." }, { status: 400 })
    }

    const id = req.url.split("/")[5]

    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(id)
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true
        }
    })

    if (user == null) {
        return NextResponse.json({ message: "User not found." }, { status: 404 })
    }

    return NextResponse.json({ success: true, user }, { status: 200 })
}