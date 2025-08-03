import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const protectedRoutes = ["/account"];
const authRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  let session = null;

  if (cookie) {
    try {
      const { payload } = await jwtVerify(cookie, JWT_SECRET);
      session = payload;
      console.log("Middleware - Session payload:", session);
    } catch (error) {
      console.log("JWT verification failed:", error);
    }
  }

  if (isProtectedRoute && !session?.userID) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthRoute && session?.userID) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
