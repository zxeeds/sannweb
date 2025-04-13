'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Gunakan useEffect untuk redirect
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Tampilkan loading
  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Tampilkan loading saat redirecting
  if (status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2">Redirecting to login...</span>
      </div>
    );
  }

  // Mendapatkan role dari session
  const userRole = session?.user?.role || 'MEMBER';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-blue-600">Post Rabbit</span>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/home" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/user/profile" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Profile
                </Link>
                <Link href="/user/orders" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  My Orders
                </Link>
                {userRole === 'ADMIN' && (
                  <Link href="/admin" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Admin Panel
                  </Link>
                )}
                {userRole === 'RESELLER' && (
                  <Link href="/reseller" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Reseller Dashboard
                  </Link>
                )}
              </nav>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div className="relative ml-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700">
                      Hi, {session?.user?.name || 'User'}
                    </span>
                    <button
                      onClick={() => router.push('/api/auth/signout')}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg bg-white shadow p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, {session?.user?.name}!</h2>
                <p className="text-gray-600">
                  Here's what's new with your account today.
                </p>
              </div>
              
              {/* Quick Access Button for Admin */}
              {userRole === 'ADMIN' && (
                <Link href="/admin" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Go to Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Account Status</h3>
              <div className="flex items-center">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  Member since {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Recent Orders</h3>
              <p className="text-3xl font-bold text-blue-600">3</p>
              <p className="text-sm text-gray-500">View your order history</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Notifications</h3>
              <p className="text-3xl font-bold text-purple-600">2</p>
              <p className="text-sm text-gray-500">You have 2 unread notifications</p>
            </div>
          </div>
        </div>

        {/* User-specific Content based on Role */}
        <div className="px-4 sm:px-0">
          {userRole === 'ADMIN' && (
            <div className="bg-blue-50 p-6 rounded-lg shadow border border-blue-100 mb-6">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Admin Quick Access</h3>
              <p className="text-blue-700 mb-4">
                Access your admin features to manage users, products, and transactions.
              </p>
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Admin Dashboard
              </button>
            </div>
          )}

          {userRole === 'RESELLER' && (
            <div className="bg-green-50 p-6 rounded-lg shadow border border-green-100 mb-6">
              <h3 className="text-lg font-medium text-green-800 mb-2">Reseller Stats</h3>
              <p className="text-green-700 mb-4">
                Check your current sales performance and manage your reseller account.
              </p>
              <button
                onClick={() => router.push('/reseller')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Go to Reseller Dashboard
              </button>
            </div>
          )}

          {/* Content for all users */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Featured Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Product Cards */}
              {[1, 2, 3].map((product) => (
                <div key={product} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-200 h-48 w-full relative">
                    {/* Placeholder for product image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      Product Image {product}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-medium text-gray-800">Product Name {product}</h4>
                    <p className="text-gray-600 text-sm mb-2">Short product description goes here.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">Rp 250.000</span>
                      <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              &copy; 2025 Post Rabbit. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}