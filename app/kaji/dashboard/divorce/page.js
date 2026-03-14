import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import KajiApplicationsList from "@/components/KajiApplicationsList";

export default async function KajiDivorceApplicationsPage() {
    const session = await auth();
    const divorceApps = await prisma.divorceApplication.findMany({
        where: { kajiId: session?.user?.id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-red-600">তালাকনামা আবেদন</h1>
                <p className="text-slate-500 font-medium">সকল তালাকনামা আবেদনগুলোর তালিকা এবং ব্যবস্থাপনা</p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <KajiApplicationsList marriageApps={[]} divorceApps={divorceApps} />
            </div>
        </div>
    );
}
