import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'frem_admin_token';

function getSecret() {
  return new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || ''
  );
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    const secret = getSecret();
    // If no secret is configured, reject all tokens
    if (secret.length === 0) return false;

    const { payload } = await jwtVerify(token, secret);

    // Verify the token has an email claim
    if (!payload.email && !payload.sub) return false;

    return true;
  } catch {
    // Token is invalid, expired, or tampered with
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for the login page itself
  if (pathname === '/admin/login') {
    // If user is already authenticated, redirect to dashboard
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token && await isValidToken(token)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin/* pages
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    // No token at all → redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Token exists but is invalid/expired → clear cookie and redirect
    const valid = await isValidToken(token);
    if (!valid) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      // Clear the invalid cookie
      response.cookies.set(COOKIE_NAME, '', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};