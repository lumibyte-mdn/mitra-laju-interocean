import { auth} from "@clerk/nextjs/server";
import clerkClient from "@clerk/clerk-sdk-node";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { UserRole } from "@/lib/interface";

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "Unauthenticated user." }, { status: 401 })
    }

    // Check if user has admin role
    const personalUser = await prisma.users.findUnique({
        where: {
            clerkId: userId
        }
    })

    if (personalUser?.role != "ADMIN") {
        return NextResponse.json({ message: "You don't have permission to perform this action." }, { status: 400 })
    }

    const data = await req.formData()

    try {
        // Create new user in clerk
        const user = await clerkClient.users.createUser({
            firstName: data.get("firstName") as string,
            lastName: data.get("lastName") as string,
            emailAddress: [data.get("email") as string],
            password: data.get("password") as string,
            publicMetadata: {
                role: data.get("role") as UserRole
            }
        })

        // Insert into database
        const createUser = await prisma.users.create({
            data: {
                clerkId: user.id,
                firstName: data.get("firstName") as string,
                lastName: data.get("lastName") as string,
                role: data.get("role") as UserRole,
                email: data.get("email") as string
            }
        })

        return NextResponse.json({ success: true, message: "User created successfully."} , { status: 201 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ success: false, message: "Failed to create user." }, { status: 500 })
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
        return NextResponse.json({ message: "You don't have permissoin to perform this action." }, { status: 400 })
    }

    const users = await prisma.users.findMany()

    return NextResponse.json({ success: true, users }, { status: 200 })
}

export async function DELETE(req: NextRequest) {
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
        return NextResponse.json({ message: "You don't have permissoin to perform this action." }, { status: 400 })
    }

    const data = await req.json()

    const user = await prisma.users.findUnique({
        where: {
            id: data.id
        },
        select: {
            clerkId: true
        }
    })

    try {
        const deleteUser = await prisma.users.delete({
            where: {
                id: data.id
            }
        })

        await clerkClient.users.deleteUser(user?.clerkId as string)
    } catch (err) {
        console.log(err)
    }

    return NextResponse.json({ success: true, message: "User deleted successfully" }, { status: 201 })
}