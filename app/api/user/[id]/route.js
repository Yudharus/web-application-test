import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request, { params }) => {
    const body = await request.json();
    const user = await prisma.user.update({
        where: {
            id: Number(params.id)
        },
        data: {
            email: body.email,
            name: body.name,
            image: body.image,
            password: body.password,
        }
    });
    return NextResponse.json(user, { status: 200 });
}


export const DELETE = async (request, { params }) => {
    const user = await prisma.user.delete({
        where: {
            id: Number(params.id)
        }
    });
    return NextResponse.json(user, { status: 200 });
}