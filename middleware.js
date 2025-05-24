import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Simple in-memory storage untuk rate limiting
const rateLimitStore = new Map();

// Rate limiting function
function checkRateLimit(ip, maxAttempts = 5, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const key = `auth_${ip}`;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, []);
  }
  
  const attempts = rateLimitStore.get(key);
  
  // Remove old attempts (outside window)
  const validAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
  
  if (validAttempts.length >= maxAttempts) {
    return false; // Rate limit exceeded
  }
  
  // Add current attempt
  validAttempts.push(now);
  rateLimitStore.set(key, validAttempts);
  
  return true; // Allow request
}

// Cleanup function (jalankan setiap request)
function cleanupRateLimit() {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  
  for (const [key, attempts] of rateLimitStore.entries()) {
    const validAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
    if (validAttempts.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, validAttempts);
    }
  }
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Cleanup old rate limit data
  cleanupRateLimit();
  
  // Rate limiting untuk auth routes
  if (path.startsWith('/auth/login') || path.startsWith('/api/auth/signin')) {
    if (!checkRateLimit(ip)) {
      return new NextResponse('Too many login attempts. Please try again in 5 minutes.', { 
        status: 429,
        headers: {
          'Retry-After': '300' // 5 minutes
        }
      });
    }
  }
  
  // Daftar path yang memerlukan autentikasi (SAMA SEPERTI SEBELUMNYA)
  const protectedPaths = ['/user', '/checkout'];
  const adminPaths = ['/admin'];
  const resellerPaths = ['/reseller'];
  const guestPaths = ['/auth/login', '/auth/register'];

  const isPath = (path, pathList) => {
    return pathList.some(p => path.startsWith(p));
  };

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Mendapatkan role dari token jika ada
  const userRole = token?.role || null;
  const isProtectedPath = isPath(path, protectedPaths);
  const isAdminPath = isPath(path, adminPaths);
  const isResellerPath = isPath(path, resellerPaths);
  const isGuestPath = isPath(path, guestPaths);

  // Logic yang sama seperti sebelumnya
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAdminPath && (!token || userRole !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/user', request.url));
  }

  if (isResellerPath && (!token || userRole !== 'RESELLER')) {
    return NextResponse.redirect(new URL('/user', request.url));
  }

  if (isGuestPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Config tetap sama
export const config = {
  matcher: ['/user/:path*', '/checkout/:path*', '/auth/:path*', '/admin/:path*', '/reseller/:path*'],
};
