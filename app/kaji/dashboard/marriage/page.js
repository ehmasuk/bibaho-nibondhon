import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import KajiApplicationsList from "@/components/KajiApplicationsList";

export default async function KajiMarriageApplicationsPage() {
    const session = await auth();
    const marriageApps = await prisma.marriageApplication.findMany({
        where: { kajiId: session?.user?.id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-primary">বিবাহ নিবন্ধন আবেদন</h1>
                <p className="text-slate-500 font-medium">সকল বিবাহ নিবন্ধনের আবেদনগুলোর তালিকা এবং ব্যবস্থাপনা</p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <KajiApplicationsList marriageApps={marriageApps} divorceApps={[]} />
            </div>
        </div>
    );
}
