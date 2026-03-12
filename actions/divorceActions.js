"use server";

import prisma from "@/prisma/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function submitDivorceApplication(values) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "USER") {
            return { success: false, message: "Unauthorized" };
        }

        const userId = session.user.id;

        // 1. Check if user already has a pending divorce application
        const existingApp = await prisma.divorceApplication.findFirst({
            where: { 
                userId,
                status: 'PENDING'
            }
        });

        if (existingApp) {
            return { success: false, message: "আপনার একটি তালাকনামা আবেদন বর্তমানে অপেক্ষমান আছে।" };
        }

        // 2. Check Husband NID in existing divorce applications
        const existingHusbandNid = await prisma.divorceApplication.findFirst({
            where: { husbandNid: values.husbandNid }
        });

        if (existingHusbandNid) {
            return { success: false, message: "এই স্বামী এনআইডি নম্বর দিয়ে ইতিমধ্যে একটি তালাকনামা আবেদন নিবন্ধিত আছে।" };
        }

        // 3. Check Wife NID
        const existingWifeNid = await prisma.divorceApplication.findFirst({
            where: { wifeNid: values.wifeNid }
        });

        if (existingWifeNid) {
            return { success: false, message: "এই স্ত্রী এনআইডি নম্বর দিয়ে ইতিমধ্যে একটি তালাকনামা আবেদন নিবন্ধিত আছে।" };
        }

        // 4. Create Application
        await prisma.divorceApplication.create({
            data: {
                userId,
                kajiId: values.kajiId,
                husbandFullName: values.husbandFullName,
                husbandNid: values.husbandNid,
                husbandFatherName: values.husbandFatherName,
                husbandMotherName: values.husbandMotherName,
                husbandAddress: values.husbandAddress,
                wifeFullName: values.wifeFullName,
                wifeNid: values.wifeNid,
                wifeFatherName: values.wifeFatherName,
                wifeMotherName: values.wifeMotherName,
                wifeAddress: values.wifeAddress,
                divorceDate: new Date(values.divorceDate),
                divorceLocation: values.divorceLocation,
                divorceReason: values.divorceReason,
                witness1Name: values.witness1Name,
                witness1Nid: values.witness1Nid,
                witness2Name: values.witness2Name,
                witness2Nid: values.witness2Nid,
                declarationAccepted: values.declarationAccepted,
            }
        });

        revalidatePath("/user/dashboard");
        return { success: true, message: "তালাকনামা আবেদন সফলভাবে জমা দেওয়া হয়েছে!" };

    } catch (error) {
        console.error("Submit Divorce Application Error:", error);
        return { success: false, message: "আবেদন জমা দিতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" };
    }
}

export async function updateDivorceApplicationStatus(applicationId, status) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "KAJI") {
            return { success: false, message: "Unauthorized" };
        }

        await prisma.divorceApplication.update({
            where: { id: applicationId },
            data: { status }
        });

        revalidatePath("/kaji/dashboard");
        return { success: true, message: `আবেদনের স্ট্যাটাস ${status} করা হয়েছে` };
    } catch (error) {
        console.error("Update Divorce Application Status Error:", error);
        return { success: false, message: "স্ট্যাটাস পরিবর্তন করতে ব্যর্থ হয়েছে" };
    }
}
