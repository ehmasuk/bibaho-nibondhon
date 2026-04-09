import { logoutAction } from "@/actions/authActions";
import AdminKajiTable from "@/components/AdminKajiTable";
import AdminApplicationsList from "@/components/AdminApplicationsList";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import { FaSignOutAlt, FaUsers, FaUserClock, FaUserCheck, FaHome, FaScroll, FaBalanceScale } from "react-icons/fa";

export default async function AdminDashboardPage() {
    const kajis = await prisma.kaji.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const marriageApps = await prisma.marriageApplication.findMany({
        include: { kaji: true },
        orderBy: { createdAt: 'desc' }
    });

    const divorceApps = await prisma.divorceApplication.findMany({
        include: { kaji: true },
        orderBy: { createdAt: 'desc' }
    });

    const stats = {
        totalKajis: kajis.length,
        activeKajis: kajis.filter(k => k?.status === 'ACTIVE').length,
        pendingKajis: kajis.filter(k => k?.status === 'PENDING').length,
        totalMarriage: marriageApps.length,
        totalDivorce: divorceApps.length,
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b-2 border-blue-600 pb-6 gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">অ্যাডমিন ড্যাশবোর্ড</h1>
                        <p className="text-gray-500 mt-1 uppercase text-[10px] md:text-xs font-bold tracking-widest bg-gray-100 md:bg-transparent px-3 py-1 rounded-full inline-block">Bibaho System Control Center</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                        <Link href="/" className="flex items-center justify-center w-12 h-12 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition shadow-sm border border-gray-200 text-xl flex-shrink-0">
                            <FaHome />
                        </Link>
                        <form action={logoutAction} className="flex-grow md:flex-grow-0">
                            <button type="submit" className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2 h-12 w-full md:w-auto rounded-xl font-bold hover:bg-red-700 transition shadow-lg">
                                <FaSignOutAlt /> সাইনআউট
                            </button>
                        </form>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 md:gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-lg md:text-xl">
                            <FaUsers />
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">মোট কাজী</h3>
                            <p className="text-2xl md:text-3xl font-black text-gray-900">{stats.totalKajis}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 md:gap-5 text-orange-600">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-lg md:text-xl">
                            <FaUserClock />
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">কাজী রিভিউ</h3>
                            <p className="text-2xl md:text-3xl font-black">{stats.pendingKajis}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 md:gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-lg md:text-xl">
                            <FaScroll />
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">বিবাহ নিবন্ধন</h3>
                            <p className="text-2xl md:text-3xl font-black text-slate-900">{stats.totalMarriage}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 md:gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-lg md:text-xl">
                            <FaBalanceScale />
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">তালাকনামা</h3>
                            <p className="text-2xl md:text-3xl font-black text-slate-900">{stats.totalDivorce}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {/* Kaji Management */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-gray-100">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">কাজী তালিকা ও ব্যবস্থাপনা</h2>
                            <p className="text-gray-500 text-sm">নিবন্ধিত কাজীদের তথ্য যাচাই এবং স্ট্যাটাস পরিবর্তন করুন</p>
                        </div>
                        <div className="p-0 md:p-4">
                            <AdminKajiTable kajis={JSON.parse(JSON.stringify(kajis))} />
                        </div>
                    </div>

                    {/* Applications Management */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <AdminApplicationsList marriageApps={marriageApps} divorceApps={divorceApps} />
                    </div>
                </div>
            </div>
        </div>
    );
}
