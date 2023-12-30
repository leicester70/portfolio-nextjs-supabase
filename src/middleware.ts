import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const PUBLIC_FILE = /\.(.*)$/;

  const nextUrl = req.nextUrl;
  const pathname = nextUrl.pathname;
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if ((user && pathname == "/") || (user && pathname == "/app")) {
    // if user is signed in and the current path is / redirect the user to /account
    return NextResponse.redirect(new URL("/app/home", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    nextUrl.pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || // exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  ) {
    return res;
  }

  return res;
}

export const config = {
  matcher: ["/", "/app/:path*"],
};
