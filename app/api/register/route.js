import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export const POST = async (request) => {
    const body = await request.json()
    const user = await prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            password: body.password,
        }
    });
    return NextResponse.json(user, { status: 201 });

}