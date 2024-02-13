import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const token = request.cookies.get("comminq_auth_token")?.value;

  // if (!token && request.url == "http://localhost:3000/")
  //   return NextResponse.redirect(new URL("/login", request.url));

  // if (token && request.url == "http://localhost:3000/login")
  //   return NextResponse.redirect(new URL("/", request.url));

  // if (token && request.url == "http://localhost:3000/register")
  //   return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}
