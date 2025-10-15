import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Middleware to protect routes that require authentication
 * This runs on EVERY request matching the config below
 */
export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/favorites',
    '/trips/new',
    '/trips/generate',
    '/review',
  ];

  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  }

  // Check if user is trying to access someone else's trip
  if (pathname.match(/^\/trips\/[^/]+$/) && pathname !== '/trips/new') {
    // Let the page itself handle authorization for viewing trips
    // (some trips may be public, some private)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/favorites/:path*',
    '/trips/new',
    '/trips/generate',
    '/review/:path*',
    '/trips/:path*',
  ],
};
