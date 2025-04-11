// app/user/dashboard/page.js
"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect jika belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Fetch data transaksi user
  useEffect(() => {
    if (status === "authenticated") {
      fetchTransactions();
    }
  }, [status]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/user/transactions');
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">Dashboard Pengguna</h1>
        
        {/* User Info Card */}
        <div className="mb-8 overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 className="text-xl font-bold">{session.user.name}</h2>
              <p className="text-gray-600">{session.user.email}</p>
            </div>
            <div className="flex space-x-3">
              <Link 
                href="/user/profile" 
                className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Edit Profil
              </Link>
              <Link 
                href="/games" 
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Topup Sekarang
              </Link>
            </div>
          </div>
        </div>
        
        {/* Transaction History */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Riwayat Transaksi</h2>
          
          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : transactions.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID Transaksi</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Game</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Jumlah</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-3 text-sm">{tx.id.substring(0, 8)}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">{tx.gameName}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">Rp {tx.amount.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          tx.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tx.status === 'completed' ? 'Selesai' : 
                           tx.status === 'pending' ? 'Menunggu' : 'Gagal'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        {new Date(tx.createdAt).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="mb-4 text-gray-500">Belum ada riwayat transaksi</p>
              <Link 
                href="/games" 
                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Mulai Topup
              </Link>
            </div>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Aksi Cepat</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link 
              href="/games"
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 rounded-full bg-blue-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-medium">Topup Game</h3>
            </Link>
            
            <Link 
              href="/user/transactions"
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 rounded-full bg-green-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-medium">Semua Transaksi</h3>
            </Link>
            
            <Link 
              href="/user/profile"
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 rounded-full bg-purple-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-medium">Profil Saya</h3>
            </Link>
            
            <Link 
              href="/support"
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 rounded-full bg-yellow-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-medium">Bantuan</h3>
            </Link>
          </div>
        </div>
        
        {/* Recent Games */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Game Terakhir Dimainkan</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Jika ada data game terakhir dimainkan */}
            <div className="rounded-lg bg-white p-4 shadow-md">
              <div className="mb-3 aspect-video rounded bg-gray-200"></div>
              <h3 className="font-medium">Mobile Legends</h3>
              <p className="text-sm text-gray-600">ID: 123456789</p>
              <div className="mt-3">
                <Link 
                  href="/games/mobile-legends"
                  className="block rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Topup Lagi
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-md">
              <div className="mb-3 aspect-video rounded bg-gray-200"></div>
              <h3 className="font-medium">Free Fire</h3>
              <p className="text-sm text-gray-600">ID: 87654321</p>
              <div className="mt-3">
                <Link 
                  href="/games/free-fire"
                  className="block rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Topup Lagi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}