"use client";

import Link from "next/link";

function NavDropdown({ title, items }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 font-bold text-white/90 hover:text-white transition uppercase text-sm tracking-wider">
        {title}
        <svg 
          className="w-4 h-4 transition-transform group-hover:rotate-180 text-white/70 group-hover:text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute left-0 top-full pt-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">
        <div className="bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden w-56 py-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-6 py-3 text-sm font-medium text-gray-600 hover:bg-primary/5 hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavDropdown;
