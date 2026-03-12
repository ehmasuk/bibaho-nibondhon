"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";
import NavDropdown from "./NavDropdown";

function Header() {
  const { data: session, status } = useSession();

  const loginItems = [
    { label: "Login as User", href: "/user/login" },
    { label: "Login as Kaji", href: "/kaji/login" },
  ];

  const registerItems = [
    { label: "Register as User", href: "/user/register" },
    { label: "Register as Kaji", href: "/kaji/register" },
  ];

  return (
    <nav className="shadow bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-4">
        <div>
          <Logo />
        </div>
        <div className="flex-1 max-w-md mx-8"></div>
        <div>
          <div className="flex items-center gap-8">
            {status == "authenticated" ? (
              <div className="relative group">
                <Link href="/">
                  <AiOutlineUser className="hover:text-blue-600 " fontSize={25} />
                </Link>
                <ProfileDropdown session={session} />
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <NavDropdown title="Login" items={loginItems} />
                <NavDropdown title="Register" items={registerItems} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
