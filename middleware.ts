// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Your Middleware logic here

  const { pathname } = request.nextUrl;

  const isWebPage = pathname.includes(".") === false;

  if (isWebPage) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
  }
  return NextResponse.next(); // Pass control to the next Middleware or route handler
}

export const config = {
  matcher: ["/", "/dashboard"],
  //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
