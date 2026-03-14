"use client";

import { logoutAction } from "@/actions/authActions";
import { message } from "antd";
import Link from "next/link";

function ProfileDropdown({ session }) {
  const handleLogout = async () => {
    await logoutAction();
    window.location.reload();
    message.success("Logout successfully");
  };

  return (
    <div
      className="
        absolute invisible opacity-0 group-hover:opacity-100 group-hover:visible overflow-hidden right-0 top-full bg-white text-black shadow  z-10 duration-500 ease-in-out w-[200px] rounded"
    >
      <ul>
        <li>
          <Link href={session?.user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"} className="px-5 py-2 w-full block hover:bg-primary/5 rounded hover:text-primary text-base transition-colors duration-200">
            ড্যাশবোর্ড
          </Link>
        </li>
        <li>
          <a href="#" onClick={handleLogout} className="px-5 py-2 w-full block hover:bg-primary/5 rounded hover:text-primary text-base transition-colors duration-200">
            লগআউট
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
