import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import KajiProfileSection from "@/components/KajiProfileSection";

export default async function KajiProfilePage() {
    const session = await auth();
    const kajiData = await prisma.kaji.findUnique({
        where: { id: session?.user?.id },
    });

    if (!kajiData) return <div>Unauthorized</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">ব্যক্তিগত প্রোফাইল</h1>
                <p className="text-slate-500 font-medium">আপনার প্রোফাইল তথ্য এখানে দেখুন এবং পরিচালনা করুন</p>
            </div>
            
            <KajiProfileSection kaji={kajiData} />
        </div>
    );
}
