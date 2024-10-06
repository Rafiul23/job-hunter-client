import { NextResponse } from "next/server";

export const middleware = async(req) => {
    const token = req.cookies.get('next-auth.session-token')?.value;
    if(!token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next();
};

export const config = {
    matcher: ['/favourite', '/jobs/:path*', '/dashboard',  ]
}