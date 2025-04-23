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
    <div className="w-64 bg-white shadow-md text-gray-800">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">PPOB App</h1>
      </div>
      
      <nav className="py-4">
        <Link 
          href="/dashboard" 
          className="flex items-center p-4 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
        >
          <Home className="mr-3 text-gray-500" />
          Dashboard
        </Link>
        
        <Link 
          href="/transaksi/riwayat" 
          className="flex items-center p-4 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
        >
          <Wallet className="mr-3 text-gray-500" />
          Riwayat Transaksi
        </Link>
        
        <Link 
          href="/pembayaran" 
          className="flex items-center p-4 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
        >
          <CreditCard className="mr-3 text-gray-500" />
          Pembayaran
        </Link>
        
        <Link 
          href="/profil" 
          className="flex items-center p-4 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
        >
          <User className="mr-3 text-gray-500" />
          Profil
        </Link>
      </nav>
    </div>
  )
}