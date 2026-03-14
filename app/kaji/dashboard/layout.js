import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import DashboardSidebar from "@/components/DashboardSidebar";
import { redirect } from "next/navigation";

export default async function KajiDashboardLayout({ children }) {
    const session = await auth();
    
    if (!session || session.user?.role !== "KAJI") {
        redirect("/kaji/login");
    }

    const kajiData = await prisma.kaji.findUnique({
        where: { id: session.user.id },
    });

    if (!kajiData) {
        redirect("/kaji/login");
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <DashboardSidebar status={kajiData.status} />
            <main className="flex-1 lg:ml-80">
                <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
