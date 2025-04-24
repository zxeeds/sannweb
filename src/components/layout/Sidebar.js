// src/components/layout/Sidebar.js
import Link from 'next/link'
import { 
  Home, 
  Wallet, 
  CreditCard, 
  User 
} from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md text-gray-800 dark:text-gray-200">
      <div className="p-4 border-b dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">PPOB App</h1>
      </div>
      
      <nav className="py-4">
        <Link 
          href="/home" 
          className="flex items-center p-4 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Home className="mr-3 text-gray-500 dark:text-gray-400" />
          Home
        </Link>
        
        <Link 
          href="/transaksi/riwayat" 
          className="flex items-center p-4 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Wallet className="mr-3 text-gray-500 dark:text-gray-400" />
          Riwayat Transaksi
        </Link>
        
        <Link 
          href="/pembayaran" 
          className="flex items-center p-4 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <CreditCard className="mr-3 text-gray-500 dark:text-gray-400" />
          Pembayaran
        </Link>
        
        <Link 
          href="/user/profile" 
          className="flex items-center p-4 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <User className="mr-3 text-gray-500 dark:text-gray-400" />
          Profil
        </Link>
      </nav>
    </div>
  )
}