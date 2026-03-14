"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const { data: session, status } = useSession();

  const loginItems = [
    { label: "ব্যবহারকারী লগইন", href: "/user/login" },
    { label: "কাজী লগইন", href: "/kaji/login" },
  ];

  const registerItems = [
    { label: "ব্যবহারকারী নিবন্ধন", href: "/user/register" },
    { label: "কাজী নিবন্ধন", href: "/kaji/register" },
  ];

  return (
    <nav className="shadow-lg bg-primary text-white sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-3">
        <div>
          <Logo />
        </div>
        <div>
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
      </div>
    </nav>
  );
}

export default Header;
