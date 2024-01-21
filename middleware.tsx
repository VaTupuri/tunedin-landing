import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Simply return the NextResponse without any modifications
    if (request.nextUrl.pathname === '/privacy_policy') {
        console.log("reached")
        // Redirect to '/path'
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

// Optional: Configure the middleware to apply to specific paths if needed
// export const config = {
//     matcher: '/:path*',
// };
