"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const { isAuthenticated, user, isLoading } = useAuth();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-600 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-white">
          TopUp Games
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white hover:text-blue-200">
            Beranda
          </Link>
          <Link href="/games" className="text-white hover:text-blue-200">
            Games
          </Link>

          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-blue-400"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link href="/user/profile" className="text-white hover:text-blue-200">
                {user?.name || 'Profil'}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/auth/login"
                className="rounded bg-white px-4 py-2 text-blue-600 hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded border border-white px-4 py-2 text-white hover:bg-blue-500"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}