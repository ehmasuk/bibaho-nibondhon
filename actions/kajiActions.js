"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function updateKajiStatus(kajiId, status) {
    try {
        await prisma.kaji.update({
            where: { id: kajiId },
            data: { status }
        });
        revalidatePath("/admin/dashboard");
        return { success: true, message: "Status updated successfully" };
    } catch (error) {
        console.error("Update Kaji Status Error:", error);
        return { success: false, message: "Failed to update status" };
    }
}

export async function getActiveKajis() {
    try {
        const kajis = await prisma.kaji.findMany({
            where: { status: 'ACTIVE' },
            select: {
                id: true,
                fullName: true,
                licenseNumber: true,
                organizationName: true,
                phone: true,
                division: true,
                district: true,
                upazila: true,
                union: true,
                addressLine: true
            }
        });
        return { success: true, data: kajis };
    } catch (error) {
        console.error("Get Active Kajis Error:", error);
        return { success: false, message: "Failed to fetch active Kajis" };
    }
}
