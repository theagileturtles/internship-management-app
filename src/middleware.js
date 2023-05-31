import {
  withAuth
} from "next-auth/middleware";
import {
  NextResponse
} from "next/server";

export default withAuth(

  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {

    // if (
    //   req.nextUrl.pathname.includes("/api/admin") &&
    //   req.nextauth.token?.roleID !== 1
    // ) {
    //   return new NextResponse("Unauthorized");
    // }
    // if (
    //   req.nextUrl.pathname.includes("/api/student") &&
    //   req.nextauth.token?.roleID !== 2
    // ) {
    //   return new NextResponse("Unauthorized");
    // }
    // if (
    //   req.nextUrl.pathname.includes("/api/instructor") &&
    //   req.nextauth.token?.roleID !== 3
    // ) {
    //   return new NextResponse("Unauthorized");
    // }
    // if (
    //   req.nextUrl.pathname.includes("/api/career-center") &&
    //   req.nextauth.token?.roleID !== 4
    // ) {
    //   return new NextResponse("Unauthorized");
    // }
    if(!req.nextauth.token){
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    if (
      req.nextUrl.pathname.includes("/admin") &&
      req.nextauth.token?.roleID !== 1
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (
      req.nextUrl.pathname.includes("/student") &&
      req.nextauth.token?.roleID !== 2
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (
      req.nextUrl.pathname.includes("/instructor") &&
      req.nextauth.token?.roleID !== 3
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (
      req.nextUrl.pathname.includes("/career-center") &&
      req.nextauth.token?.roleID !== 4
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }, {
    secret: process.env.AUTH_SECRET,
    callbacks: {
      authorized: (params) => {
        let {
          token
        } = params;
        if(!token){
          return new NextResponse("Unauthorized");
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [ "/","/admin/:path*",
     "/student/:path*",
    "/career-center/:path*",
   "/instructor/:path*",
     "/messages/:path*",
  ]
};