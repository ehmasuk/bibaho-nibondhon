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
