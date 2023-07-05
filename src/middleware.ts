import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  //   const { url } = request;
  //   // Check if the token is present
  //   const token = localStorage.getItem("comminq-token");
  //   if (request.nextUrl.pathname === "/login" && token) {
  //     // User is already logged in, redirect to home
  //     return NextResponse.redirect("/");
  //   }
  //   if (request.nextUrl.pathname !== "/login" && !token) {
  //     // User is not logged in, redirect to login
  //     return NextResponse.redirect("/login");
  //   }
  //   if (!token) {
  //     // Redirect to the login page if there is no token
  //     if (url === "/" || url === "/messages") {
  //       return NextResponse.redirect("/login");
  //     }
  //   } else {
  //     // Redirect to the home page if there is a token and the user tries to access the register page
  //     if (url === "/register") {
  //       return NextResponse.redirect("/");
  //     }
  //   }
  //   return NextResponse.next();
}
