import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import Link from "next/link";
import { FaBalanceScale, FaScroll, FaTasks, FaUsers } from "react-icons/fa";

export default async function KajiDashboardPage() {
  const session = await auth();

  // 1. Fetch kaji data and apps for summary
  const [kajiData, marriageApps, divorceApps] = await Promise.all([
    prisma.kaji.findUnique({ where: { id: session?.user?.id } }),
    prisma.marriageApplication.findMany({
      where: { kajiId: session?.user?.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.divorceApplication.findMany({
      where: { kajiId: session?.user?.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!kajiData) return <div>Unauthorized</div>;

  // 2. Calculate Stats
  const totalTasks = marriageApps.length + divorceApps.length;
  const newRequestsCount = [...marriageApps, ...divorceApps].filter((app) => app.status === "PENDING").length;
  const marriageRegCount = marriageApps.filter((app) => app.status === "ACCEPTED").length;
  const divorceRegCount = divorceApps.filter((app) => app.status === "ACCEPTED").length;

  const stats = [
    { label: "মোট আবেদন", value: totalTasks, icon: FaTasks, color: "bg-blue-100 text-blue-600", border: "border-blue-100" },
    { label: "নতুন আবেদন", value: newRequestsCount, icon: FaUsers, color: "bg-orange-100 text-orange-600", border: "border-orange-100" },
    { label: "বিবাহ নিবন্ধন", value: marriageRegCount, icon: FaScroll, color: "bg-primary/10 text-primary", border: "border-primary/10" },
    { label: "তালাকনামা", value: divorceRegCount, icon: FaBalanceScale, color: "bg-red-100 text-red-600", border: "border-red-100" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          স্বাগতম, <span className="text-primary">{kajiData.fullName}</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg">আপনার আজকের ড্যাশবোর্ড ওভারভিউ এখানে দেওয়া হলো</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-white p-8 rounded-[2rem] shadow-sm border ${stat.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
              <stat.icon />
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <p className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            সাম্প্রতিক বিবাহ আবেদন
          </h2>
          <div className="space-y-4">
            {marriageApps.slice(0, 3).map((app, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors">
                <div>
                  <p className="font-bold text-slate-900">{app.groomFullName}</p>
                  <p className="text-xs text-slate-500">{new Date(app.createdAt).toLocaleDateString("bn-BD")}</p>
                </div>
                <Link href="/kaji/dashboard/marriage" className="text-primary font-bold text-sm hover:underline">
                  বিস্তারিত
                </Link>
              </div>
            ))}
            {marriageApps.length === 0 && <p className="text-slate-400 italic">কোনো আবেদন নেই</p>}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-red-600 rounded-full"></span>
            সাম্প্রতিক তালাক আবেদন
          </h2>
          <div className="space-y-4">
            {divorceApps.slice(0, 3).map((app, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-colors">
                <div>
                  <p className="font-bold text-slate-900">{app.husbandFullName}</p>
                  <p className="text-xs text-slate-500">{new Date(app.createdAt).toLocaleDateString("bn-BD")}</p>
                </div>
                <Link href="/kaji/dashboard/divorce" className="text-red-600 font-bold text-sm hover:underline">
                  বিস্তারিত
                </Link>
              </div>
            ))}
            {divorceApps.length === 0 && <p className="text-slate-400 italic">কোনো আবেদন নেই</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
