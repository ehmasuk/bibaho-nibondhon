"use client";

import { logoutAction } from "@/actions/authActions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBalanceScale, FaBars, FaHome, FaScroll, FaSignOutAlt, FaTasks, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "./Logo";

const MenuLink = ({ href, icon: Icon, children, active, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 group ${
      active ? "bg-white/10 text-white shadow-lg shadow-black/5 backdrop-blur-md border border-white/10" : "text-white/60 hover:bg-white/5 hover:text-white"
    }`}
  >
    <span className={`text-xl transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
      <Icon />
    </span>
    <span className="font-bold tracking-wide">{children}</span>
  </Link>
);

export default function DashboardSidebar({ status }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/kaji/dashboard", icon: FaTasks, label: "ওভারভিউ" },
    { href: "/kaji/dashboard/marriage", icon: FaScroll, label: "বিবাহ নিবন্ধন" },
    { href: "/kaji/dashboard/divorce", icon: FaBalanceScale, label: "তালাকনামা" },
    { href: "/kaji/dashboard/profile", icon: FaUserCircle, label: "প্রোফাইল" },
  ];

  const statusConfig = {
    ACTIVE: { label: "সক্রিয়", color: "bg-emerald-500", text: "text-emerald-500" },
    PENDING: { label: "অপেক্ষমান", color: "bg-amber-500", text: "text-amber-500" },
    REJECTED: { label: "প্রত্যাখ্যাত", color: "bg-rose-500", text: "text-rose-500" },
  };

  const currentStatus = statusConfig[status] || statusConfig.PENDING;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-4 z-[100] w-12 h-12 bg-primary text-white rounded-xl shadow-xl flex items-center justify-center text-xl transition-all active:scale-95 border-2 border-white/20 active:bg-primary/90"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-80 bg-primary z-40 transition-transform duration-500 lg:translate-x-0 overflow-hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="relative flex flex-col h-full p-8 z-10">
          {/* Logo & Header */}
          <div className="mb-12 px-4">
            <div className="inline-block transform hover:scale-105 transition-transform duration-300 brightness-0 invert">
              <Logo />
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <p className="font-black tracking-[0.2em] text-white">কাজী প্যানেল</p>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 w-fit">
                <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.color} animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]`}></span>
                <span className="text-[9px] font-black uppercase tracking-wider text-white">{currentStatus.label}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-3">
            {menuItems.map((item) => (
              <MenuLink key={item.href} href={item.href} icon={item.icon} active={pathname === item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </MenuLink>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-white/10 italic">
            <Link href="/" className="flex items-center gap-3 px-6 py-4 text-white/60 hover:text-white transition-colors group mb-2">
              <FaHome className="text-xl group-hover:-translate-y-1 transition-transform" />
              <span className="font-bold">হোম পেজ</span>
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="w-full flex items-center gap-3 px-6 py-4 text-white/50 hover:text-white transition-colors group">
                <FaSignOutAlt className="text-xl group-hover:translate-x-1 transition-transform" />
                <span className="font-bold">সাইনআউট</span>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
