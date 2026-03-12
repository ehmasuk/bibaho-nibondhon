import { logoutAction } from "@/actions/authActions";
import AdminKajiTable from "@/components/AdminKajiTable";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import { FaSignOutAlt, FaUsers, FaUserClock, FaUserCheck, FaHome } from "react-icons/fa";

export default async function AdminDashboardPage() {
    const kajis = await prisma.kaji.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const stats = {
        total: kajis.length,
        active: kajis.filter(k => k?.status === 'ACTIVE').length,
        pending: kajis.filter(k => k?.status === 'PENDING').length,
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b-2 border-blue-600 pb-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">অ্যাডমিন ড্যাশবোর্ড</h1>
                        <p className="text-gray-500 mt-1 uppercase text-xs font-bold tracking-widest">Bibaho System Control Center</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center justify-center w-12 h-12 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition shadow-sm border border-gray-200 text-xl">
                            <FaHome />
                        </Link>
                        <form action={logoutAction}>
                            <button type="submit" className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 h-12 rounded-xl font-bold hover:bg-red-700 transition shadow-lg">
                                <FaSignOutAlt /> সাইনআউট
                            </button>
                        </form>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
                            <FaUsers />
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">মোট কাজী</h3>
                            <p className="text-3xl font-black text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
                            <FaUserCheck />
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">সক্রিয় কাজী</h3>
                            <p className="text-3xl font-black text-green-600">{stats.active}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 text-orange-600">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl">
                            <FaUserClock />
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">অপেক্ষমান রিভিউ</h3>
                            <p className="text-3xl font-black">{stats.pending}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900">কাজী তালিকা ও ব্যবস্থাপনা</h2>
                        <p className="text-gray-500 text-sm">নিবন্ধিত কাজীদের তথ্য যাচাই এবং স্ট্যাটাস পরিবর্তন করুন</p>
                    </div>
                    <div className="p-4">
                        <AdminKajiTable kajis={JSON.parse(JSON.stringify(kajis))} />
                    </div>
                </div>
            </div>
        </div>
    );
}
