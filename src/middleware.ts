import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Define your Auth vs Dashboard routes
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/reset-password');

  // 1. If trying to access CMS without token -> Send to Login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. If logged in and hitting Login page -> Send to Dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/states', request.url));
  }

  // 3. Root redirect
 // 3. Root redirect (Improved)
if (pathname === '/') {
  const target = token ? '/states' : '/login';
  return NextResponse.redirect(new URL(target, request.url));
}

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};