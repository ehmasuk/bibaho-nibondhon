import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import uploadToCloudinary from "@/helpers/uploadToCloudinary";

export async function POST(req) {
    try {
        const { 
            fullName, 
            email, 
            password, 
            nid, 
            phone, 
            licenseNumber, 
            organizationName, 
            division, 
            district, 
            upazila, 
            addressLine,
            image
        } = await req.json();

        if (!fullName || !email || !password || !nid || !phone || !licenseNumber || !organizationName || !division || !district || !upazila || !addressLine || !image) {
            return NextResponse.json({ message: "সবগুলো ঘর পূরণ করা আবশ্যক" }, { status: 400 });
        }

        const existingKaji = await prisma.kaji.findFirst({
            where: {
                OR: [
                    { nid },
                    { licenseNumber },
                    { email }
                ]
            },
            select: { id: true }
        });

        if (existingKaji) {
            return NextResponse.json({ message: "এই এনআইডি, লাইসেন্স নম্বর বা ইমেইল দিয়ে ইতঃপূর্বে নিবন্ধন করা হয়েছে" }, { status: 400 });
        }

        // Upload image to Cloudinary
        let imageUrl = null;
        if (image) {
            imageUrl = await uploadToCloudinary(image);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newKaji = await prisma.kaji.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
                nid,
                phone,
                licenseNumber,
                organizationName,
                division,
                district,
                upazila,
                addressLine,
                image: imageUrl,
                status: "PENDING"
            }
        });

        return NextResponse.json({
            message: "কাজী নিবন্ধন সফল হয়েছে। আপনার একাউন্টটি অনুমোদনের অপেক্ষায় আছে।",
            kaji: { nid: newKaji.nid, licenseNumber: newKaji.licenseNumber }
        }, { status: 201 });

    } catch (error) {
        console.error("Kaji Registration Error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
