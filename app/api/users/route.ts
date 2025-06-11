import { auth} from "@clerk/nextjs/server";
import clerkClient from "@clerk/clerk-sdk-node";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

enum UserRole {
    ADMIN = "ADMIN",
    KARYAWAN = "KARYAWAN"
}

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ message: "Unauthenticated user." }, { status: 401 })
    }

    // Check if user has admin role
    const hasAdminRole = await prisma.users.findUnique({
        where: {
            clerkId: userId
        }, 
        select: {
            role: true
        }
    })
    
    if (hasAdminRole?.role != "ADMIN") {
        return NextResponse.json({ message: "Unauthorized action." }, { status: 403 })
    }
    
    const data = await req.formData()

    try {
        const user = await clerkClient.users.createUser({
            firstName: data.get("firstName") as string,
            lastName: data.get("lastName") as string,
            emailAddress: [data.get("email") as string],
            password: data.get("password") as string 
        })
        
        // Insert into internal database
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

    try {
        const users = await prisma.users.findMany()

        return NextResponse.json({ success: true, users }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Failed to fetch users." }, { status: 500 })
    }
}