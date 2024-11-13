export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/account",
    "/dashboard",
    "/operation",
    "/operation/:path*",
    "/utilisateurs/:path*",
    "/utilisateurs",
  ],
};
//:path*
