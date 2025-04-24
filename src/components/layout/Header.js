// src/components/layout/Header.js
'use client'

import { 
  Bell, 
  Search, 
  User as UserIcon,
  Moon,
  Sun
} from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useSession } from 'next-auth/react'

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme()
  const { data: session } = useSession()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 flex items-center">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Cari layanan..."
              className="w-full pl-10 pr-4 py-2 rounded-full border dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" 
            />
          </div>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Tombol Theme */}
          <button 
            onClick={toggleTheme} 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </button>

          {/* Notifikasi */}
          <button className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600">
            <Bell />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              3
            </span>
          </button>
          
          {/* Profil Pengguna */}
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <UserIcon className="mr-2 text-gray-500 dark:text-gray-400" />
            <span>{session?.user?.name || 'Loading...'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}