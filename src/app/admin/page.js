'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Gunakan useEffect untuk redirect
  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'ADMIN')) {
      router.push('/auth/login');
    }
  }, [status, session, router]);

  // Tampilkan loading jika masih loading
  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Tampilkan loading jika sudah tahu user tidak terautentikasi atau bukan admin
  if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'ADMIN')) {
    return <div className="flex justify-center items-center min-h-screen">Redirecting...</div>;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 bg-blue-600 text-white">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <button
                onClick={() => handleTabChange('dashboard')}
                className={`w-full text-left px-4 py-2 ${
                  activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('users')}
                className={`w-full text-left px-4 py-2 ${
                  activeTab === 'users' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                Manajemen User
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('products')}
                className={`w-full text-left px-4 py-2 ${
                  activeTab === 'products' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                Produk
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('transactions')}
                className={`w-full text-left px-4 py-2 ${
                  activeTab === 'transactions' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                Transaksi
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('settings')}
                className={`w-full text-left px-4 py-2 ${
                  activeTab === 'settings' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                Pengaturan
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'users' && 'Manajemen User'}
            {activeTab === 'products' && 'Produk'}
            {activeTab === 'transactions' && 'Transaksi'}
            {activeTab === 'settings' && 'Pengaturan'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Selamat datang, {session?.user?.name || 'Admin'}</span>
            <button
              onClick={() => router.push('/api/auth/signout')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">245</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Transaksi Bulan Ini</h3>
              <p className="text-3xl font-bold text-green-600">128</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Pendapatan</h3>
              <p className="text-3xl font-bold text-purple-600">Rp 15.750.000</p>
            </div>
          </div>
        )}

        {/* Users Management Content */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <input
                type="text"
                placeholder="Cari user..."
                className="px-4 py-2 border rounded-lg"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Tambah User Baru
              </button>
            </div>
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Ahmad Sanjaya</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">ahmad@example.com</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Hapus</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Budi Santoso</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">budi@example.com</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Reseller
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">245</span> results
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  >
                    2
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    3
                  </button>
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Products Content */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700">Halaman manajemen produk akan ditampilkan di sini.</p>
          </div>
        )}

        {/* Transactions Content */}
        {activeTab === 'transactions' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700">Halaman manajemen transaksi akan ditampilkan di sini.</p>
          </div>
        )}

        {/* Settings Content */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700">Halaman pengaturan akan ditampilkan di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}