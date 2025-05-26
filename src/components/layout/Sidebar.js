'use client'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Package, 
  History, 
  Crown, 
  BarChart3, 
  Shield, 
  Moon, 
  LogOut, 
  X, 
  ChevronDown 
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Sidebar({ isOpen, setIsOpen }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isAdminExpanded, setIsAdminExpanded] = useState(false)

  const toggleAdminMenu = () => {
    setIsAdminExpanded(prev => !prev)
  }

  // Menu untuk semua user
  const mainMenuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home
    },
    {
      name: 'Produk',
      href: '/produk',
      icon: Package
    },
    {
      name: 'Riwayat Transaksi',
      href: '/riwayat-transaksi',
      icon: History
    }
  ]

  // Menu admin
  const adminMenuItems = [
    {
      name: 'Dashboard Admin',
      href: '/admin',
      icon: BarChart3
    },
    {
      name: 'VPN',
      href: '/admin/vpn',
      icon: Shield
    },
    {
      name: 'VPN Accounts',
      href: '/admin/vpn/accounts',
      icon: Shield
    }
  ]

  const isActive = (href) => pathname === href

  // Handle logout dengan redirect ke halaman login
  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: '/login',
      redirect: true 
    })
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Fixed position, no scroll */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo - Fixed height */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AdminPanel
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info - Fixed height */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {session?.user?.email}
                </p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  session?.user?.role === 'ADMIN'
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                }`}>
                  {session?.user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation - Flexible height, no scroll */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-hidden">
            {/* Menu Utama - Untuk semua user */}
            {mainMenuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="mr-3 w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}

            {/* Admin Panel - Hanya untuk ADMIN */}
            {session?.user?.role === 'ADMIN' && (
              <>
                {/* Admin Panel Toggle */}
                <button
                  onClick={toggleAdminMenu}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <Crown className="mr-3 w-5 h-5" />
                    Admin Panel
                  </div>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${isAdminExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Admin Submenu */}
                {isAdminExpanded && (
                  <div className="ml-4 mt-2 space-y-1">
                    {adminMenuItems.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ml-4 ${
                            isActive(item.href)
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <IconComponent className="mr-3 w-5 h-5" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </nav>

          {/* Footer - Fixed height */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 flex-shrink-0">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center">
                <Moon className="mr-2 w-4 h-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
              </div>
              <ThemeToggle />
            </div>

            {/* Logout Button - Updated untuk redirect ke /login */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="mr-3 w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
