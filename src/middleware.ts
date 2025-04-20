import { NextRequest, NextResponse } from "next/server";
import { getToken, verifyToken } from "@/lib/backend/auth";

export async function middleware(req: NextRequest) {
  const token = getToken(req);
  const payload = token ? await verifyToken(token) : null;
  const { pathname } = req.nextUrl;

  // Handle root path redirect
  if (pathname === "/") {
    if (payload) {
      return NextResponse.redirect(new URL("/home", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If user is authenticated and tries to access /login or /signup, redirect to /home
  if (
    payload &&
    (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Protect /home and /chat routes
  if (
    (pathname.startsWith("/home") || pathname.startsWith("/chat")) &&
    !payload
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/home/:path*", "/chat/:path*", "/login", "/signup"],
};
