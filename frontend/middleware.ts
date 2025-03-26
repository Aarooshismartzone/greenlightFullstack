import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const token = request.cookies.get('token')?.value; // Read JWT from cookies

    // Restrict access to `/dashboard` routes
    if (url.pathname.startsWith('/dashboard') && !token) {
        url.pathname = '/login'; // Redirect to login page
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Limit middleware scope to `/dashboard` routes
export const config = {
    matcher: ['/dashboard/:path*'],
};
