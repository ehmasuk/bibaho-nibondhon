import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request) {
  const session = await auth();

  const path = request.nextUrl.pathname;

  const role = session?.user?.role;

  // Public routes: /, /user/login, /user/register
  if (role && (path === "/user/login" || path === "/user/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Handle unauthenticated access to protected routes
  if (!session) {
    if (path.startsWith("/admin") && path !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (path.startsWith("/kaji") && !(path === "/kaji/login" || path === "/kaji/register")) { // Protect all kaji routes
      return NextResponse.redirect(new URL("/kaji/login", request.url));
    }
    // Protect all user routes except login and register
    if (path.startsWith("/user") && !(path === "/user/login" || path === "/user/register")) {
      return NextResponse.redirect(new URL("/user/login", request.url));
    }
  }

  // Role-based redirection
  if (role === "ADMIN") {
    if (path.startsWith("/user") || path.startsWith("/kaji")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  } else if (role === "KAJI") {
    if (path.startsWith("/user") || path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/kaji/dashboard", request.url));
    }
  } else if (role === "USER") {
    if (path.startsWith("/admin") || path.startsWith("/kaji")) {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  // Official Portal Redirection (Admins should go to admin dashboard)
  if (path === "/admin/login" && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/", "/user/:path*", "/admin/:path*", "/kaji/:path*", "/user/dashboard", "/kaji/dashboard", "/admin/dashboard"],
};
