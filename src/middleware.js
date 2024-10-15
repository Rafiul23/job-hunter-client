import { NextResponse } from "next/server";

export const middleware = async(req) => {
    const token = req.cookies.get('__Secure-next-auth.session-token')?.value;
    // const token = req.cookies.get('next-auth.session-token')?.value;
    const pathname = req.nextUrl.pathname
    if(!token) {
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url))
    }
    return NextResponse.next();
};

export const config = {
    matcher: ['/favourite', '/jobs/:path*', '/dashboard', '/adminprofile', '/manageusers', '/addjob', '/managejobs', '/userprofile', '/appliedjobs', '/recruiterprofile', '/myjobs'  ]
}