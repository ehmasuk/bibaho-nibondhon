"use server";

import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function submitMarriageApplication(values) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "USER") {
            return { success: false, message: "Unauthorized" };
        }

        const userId = session.user.id;

        // 1. Check if user already applied
        const existingUserApp = await prisma.marriageApplication.findUnique({
            where: { userId }
        });

        if (existingUserApp) {
            return { success: false, message: "আপনি ইতিমধ্যে একটি বিবাহের জন্য আবেদন করেছেন।" };
        }

        // 2. Check Groom NID
        const existingGroomNid = await prisma.marriageApplication.findFirst({
            where: { groomNid: values.groomNid }
        });

        if (existingGroomNid) {
            return { success: false, message: "এই বর এনআইডি নম্বর দিয়ে ইতিমধ্যে একটি বিবাহ নিবন্ধিত আছে (This Groom NID already has a marriage registry)" };
        }

        // 3. Check Bride NID
        const existingBrideNid = await prisma.marriageApplication.findFirst({
            where: { brideNid: values.brideNid }
        });

        if (existingBrideNid) {
            return { success: false, message: "এই কনে এনআইডি নম্বর দিয়ে ইতিমধ্যে একটি বিবাহ নিবন্ধিত আছে (This Bride NID already has a marriage registry)" };
        }

        // 4. Create Application
        await prisma.marriageApplication.create({
            data: {
                userId,
                kajiId: values.kajiId,
                groomFullName: values.groomFullName,
                groomNid: values.groomNid,
                groomFatherName: values.groomFatherName,
                groomMotherName: values.groomMotherName,
                groomAddress: values.groomAddress,
                brideFullName: values.brideFullName,
                brideNid: values.brideNid,
                brideFatherName: values.brideFatherName,
                brideMotherName: values.brideMotherName,
                brideAddress: values.brideAddress,
                marriageDate: new Date(values.marriageDate),
                denmohorAmount: parseInt(values.denmohorAmount),
                marriageLocation: values.marriageLocation,
                groomWitness1Name: values.groomWitness1Name,
                groomWitness1Nid: values.groomWitness1Nid,
                groomWitness2Name: values.groomWitness2Name,
                groomWitness2Nid: values.groomWitness2Nid,
                brideWitness1Name: values.brideWitness1Name,
                brideWitness1Nid: values.brideWitness1Nid,
                brideWitness2Name: values.brideWitness2Name,
                brideWitness2Nid: values.brideWitness2Nid,
                declarationAccepted: values.declarationAccepted,
            }
        });

        revalidatePath("/user/dashboard");
        return { success: true, message: "বিবাহ নিবন্ধনের আবেদন সফলভাবে জমা দেওয়া হয়েছে!" };

    } catch (error) {
        console.error("Submit Marriage Application Error:", error);
        return { success: false, message: "আবেদন জমা দিতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" };
    }
}

export async function updateMarriageApplicationStatus(applicationId, status) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "KAJI") {
            return { success: false, message: "Unauthorized" };
        }

        await prisma.marriageApplication.update({
            where: { id: applicationId },
            data: { status }
        });

        revalidatePath("/kaji/dashboard");
        return { success: true, message: `আবেদনের স্ট্যাটাস ${status} করা হয়েছে` };
    } catch (error) {
        console.error("Update Marriage Application Status Error:", error);
        return { success: false, message: "স্ট্যাটাস পরিবর্তন করতে ব্যর্থ হয়েছে" };
    }
}
