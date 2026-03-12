import { logoutAction } from "@/actions/authActions";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import { FaCheckDouble, FaHome, FaScroll, FaSignOutAlt, FaTasks, FaUsers } from "react-icons/fa";

export default async function KajiDashboardPage() {
  const session = await auth();

  // Fetch kaji data to get current status
  const kajiData = await prisma.kaji.findUnique({
    where: { licenseNumber: session?.user?.licenseNumber },
  });

  const statusColors = {
    PENDING: "bg-yellow-500 text-yellow-950",
    ACTIVE: "bg-green-500 text-green-950",
    REJECTED: "bg-red-500 text-red-950",
  };

  const statusLabels = {
    PENDING: "অপেক্ষমান (Pending)",
    ACTIVE: "সক্রিয় (Active)",
    REJECTED: "প্রত্যাখ্যাত (Rejected)",
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 pt-10 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-200">অফিসিয়াল পোর্টাল</span>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusColors[kajiData?.status] || "bg-gray-500"}`}>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                অ্যাকাউন্ট স্ট্যাটাস: {statusLabels[kajiData?.status] || kajiData?.status}
              </div>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">কাজী ড্যাশবোর্ড</h1>
            <p className="text-gray-500 mt-2 text-lg font-medium">
              লাইসেন্স নম্বর: <span className="text-indigo-600 font-mono">{session?.user?.licenseNumber}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center justify-center w-12 h-12 bg-white text-gray-700 rounded-2xl hover:bg-gray-100 transition shadow-sm border border-gray-200 text-xl">
              <FaHome />
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2 bg-indigo-900 text-white px-8 py-3 h-12 rounded-2xl font-bold hover:bg-indigo-800 transition shadow-xl hover:scale-105 active:scale-95 duration-200"
              >
                <FaSignOutAlt /> সাইনআউট
              </button>
            </form>
          </div>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
              <FaTasks />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Tasks</p>
            <p className="text-3xl font-black text-gray-900">0</p>
          </div>
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition text-orange-600">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
              <FaUsers />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">New Requests</p>
            <p className="text-3xl font-black text-orange-600">0</p>
          </div>
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
              <FaScroll />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Marriage Reg.</p>
            <p className="text-3xl font-black text-gray-900">0</p>
          </div>
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
              <FaCheckDouble />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Processed</p>
            <p className="text-3xl font-black text-gray-900">0</p>
          </div>
        </div>

        {/* Dashboard Bottom Section */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-indigo-600 pl-4">Pending Verifications</h2>
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-gray-300 text-6xl mb-6">
              <FaScroll opacity={0.5} />
            </div>
            <p className="text-gray-500 font-medium text-lg">Your verification queue is empty</p>
            <p className="text-gray-400 mt-2">New applications will appear here once submitted by users.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
