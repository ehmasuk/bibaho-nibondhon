import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { nid, password } = await req.json();

    if (!nid || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
        const isExist = await prisma.user.findUnique({ where: { nid } });

        if (isExist) {
            return NextResponse.json({ message: "NID already exist" }, { status: 400 });
        }

        const encriptPassword = bcrypt.hashSync(password, 10);

        const user = await prisma.user.create({ data: { nid, password: encriptPassword } });

        if (!user) {
            return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
        }

        return NextResponse.json({ message: "User created" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
};
