import { NextResponse, } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const POST = async (request) => {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Temukan pengguna berdasarkan alamat email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // Jika pengguna tidak ditemukan, kembalikan respons kesalahan
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 401 }
            );
        }

        // Verifikasi kata sandi
        const passwordMatch = user.password === password;

        // Jika kata sandi cocok, arahkan ke halaman /dashboard
        if (passwordMatch) {
            return NextResponse.json(
                user,
                { status: 200 }
            );

        } else {
            // Jika kata sandi tidak cocok, kembalikan respons kesalahan
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            error,
            { status: 200 }
        );
    } finally {
        await prisma.$disconnect();
    }

};
