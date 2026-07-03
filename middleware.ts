import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // If accessing /admin/login while already authenticated, redirect to dashboard
    if (req.nextUrl.pathname === '/admin/login') {
      const token = req.cookies.get('next-auth.session-token');
      if (token) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Protect /admin/* routes except /admin/login and /admin/api/*
        const { pathname } = req.nextUrl;

        // Allow login page and API routes
        if (
          pathname === '/admin/login' ||
          pathname.startsWith('/api/')
        ) {
          return true;
        }

        // Require valid token for all other /admin/* routes
        if (pathname.startsWith('/admin')) {
          return !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
