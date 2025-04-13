import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Daftar path yang memerlukan autentikasi
  const protectedPaths = ['/user', '/checkout'];
  
  // Daftar path khusus admin
  const adminPaths = ['/admin'];
  
  // Daftar path khusus reseller
  const resellerPaths = ['/reseller'];
  
  // Daftar path untuk tamu (belum login)
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

  // Jika user akses halaman yang perlu autentikasi tapi belum login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Jika user akses halaman admin tapi bukan admin
  if (isAdminPath && (!token || userRole !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/user', request.url));
  }

  // Jika user akses halaman reseller tapi bukan reseller
  if (isResellerPath && (!token || userRole !== 'RESELLER')) {
    return NextResponse.redirect(new URL('/user', request.url));
  }

  // Jika user sudah login tapi akses halaman login/register
  if (isGuestPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Konfigurasi path yang perlu dicek middleware
export const config = {
  matcher: ['/user/:path*', '/checkout/:path*', '/auth/:path*', '/admin/:path*', '/reseller/:path*'],
};