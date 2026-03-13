import { logoutAction } from "@/actions/authActions";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import { FaCheckDouble, FaHome, FaScroll, FaSignOutAlt, FaTasks, FaUsers, FaBalanceScale } from "react-icons/fa";
import KajiProfileSection from "@/components/KajiProfileSection";
import KajiApplicationsList from "@/components/KajiApplicationsList";

export default async function KajiDashboardPage() {
  const session = await auth();

  // 1. Fetch kaji data
  const kajiData = await prisma.kaji.findUnique({
    where: { id: session?.user?.id },
  });

  if (!kajiData) return <div>Unauthorized</div>;

  // 2. Fetch applications
  const [marriageApps, divorceApps] = await Promise.all([
    prisma.marriageApplication.findMany({
      where: { kajiId: kajiData.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.divorceApplication.findMany({
      where: { kajiId: kajiData.id },
      orderBy: { createdAt: "desc" },
    })
  ]);

  // 3. Calculate Stats
  const totalTasks = marriageApps.length + divorceApps.length;
  const newRequestsCount = [...marriageApps, ...divorceApps].filter(app => app.status === "PENDING").length;
  const processedCount = [...marriageApps, ...divorceApps].filter(app => app.status !== "PENDING").length;
  const marriageRegCount = marriageApps.filter(app => app.status === "ACCEPTED").length;
  const divorceRegCount = divorceApps.filter(app => app.status === "ACCEPTED").length;

  const statusColors = {
    PENDING: "bg-yellow-200 text-yellow-950",
    ACTIVE: "bg-green-200 text-green-950",
    REJECTED: "bg-red-200 text-red-950",
  };

  const statusLabels = {
    PENDING: "PENDING",
    ACTIVE: "ACTIVE",
    REJECTED: "REJECTED",
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-screen-xl mx-auto px-6 pt-10 mb-10 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">কাজী ড্যাশবোর্ড</h1>
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

      <main className="max-w-screen-xl mx-auto px-6">
        {/* Profile Section */}
        <KajiProfileSection kaji={kajiData} />

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
              <FaTasks />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Tasks</p>
            <p className="text-3xl font-black text-gray-900">{totalTasks}</p>
          </div>
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition text-orange-600">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
              <FaUsers />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">New Requests</p>
            <p className="text-3xl font-black text-orange-600">{newRequestsCount}</p>
          </div>
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
              <FaScroll />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Marriage Reg.</p>
            <p className="text-3xl font-black text-gray-900">{marriageRegCount}</p>
          </div>
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
              <FaBalanceScale />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Divorce Reg.</p>
            <p className="text-3xl font-black text-gray-900">{divorceRegCount}</p>
          </div>
        </div>

        {/* Dashboard Bottom Section */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <KajiApplicationsList marriageApps={marriageApps} divorceApps={divorceApps} />
        </div>
      </main>
    </div>
  );
}
