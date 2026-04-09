"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const loginItems = [
    { label: "ব্যবহারকারী লগইন", href: "/user/login" },
    { label: "কাজী লগইন", href: "/kaji/login" },
  ];

  const registerItems = [
    { label: "ব্যবহারকারী নিবন্ধন", href: "/user/register" },
    { label: "কাজী নিবন্ধন", href: "/kaji/register" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="shadow-lg bg-primary text-white sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-3">
        <div>
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-8">
            <Link href="/kajis" className="text-white/90 hover:text-white font-medium transition-colors">
              কাজীদের তথ্যের তালিকা
            </Link>
            {status == "authenticated" ? (
              <div className="relative group">
                <Link href="/">
                  <AiOutlineUser className="hover:text-pink-200 transition-colors duration-200" fontSize={25} />
                </Link>
                <ProfileDropdown session={session} />
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <NavDropdown title="লগইন করুন" items={loginItems} />
                <NavDropdown title="নিবন্ধন করুন" items={registerItems} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex items-center gap-4">
          {status === "authenticated" && (
             <Link href={session.user.role === "ADMIN" ? "/admin/dashboard" : session.user.role === "KAJI" ? "/kaji/dashboard" : "/user/dashboard"}>
                <AiOutlineUser className="text-white" fontSize={25} />
             </Link>
          )}
          <button 
            onClick={toggleMenu}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      />

      {/* Mobile Drawer Content */}
      <div 
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] bg-white text-gray-800 shadow-2xl transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <div className="brightness-100">
               <Logo />
            </div>
            <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <AiOutlineClose size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto">
            <Link 
              href="/kajis" 
              onClick={toggleMenu}
              className="px-4 py-3 font-semibold text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
            >
              কাজীদের তথ্যের তালিকা
            </Link>

            {status !== "authenticated" ? (
              <>
                <div className="mt-4 mb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">লগইন</div>
                {loginItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMenu}
                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-4 mb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">নিবন্ধন</div>
                {registerItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={toggleMenu}
                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            ) : (
               <Link 
                href={session.user.role === "ADMIN" ? "/admin/dashboard" : session.user.role === "KAJI" ? "/kaji/dashboard" : "/user/dashboard"}
                onClick={toggleMenu}
                className="px-4 py-3 font-semibold text-primary bg-primary/5 rounded-xl transition-all mt-4 flex items-center gap-2"
              >
                <AiOutlineUser /> ড্যাশবোর্ডে যান
              </Link>
            )}
          </div>

          <div className="mt-auto pt-6 text-center text-xs text-gray-400 border-t border-gray-100">
             © ২০২৪ বিবাহনিবন্ধন পোর্টাল
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
