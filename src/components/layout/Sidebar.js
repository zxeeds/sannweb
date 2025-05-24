'use client'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Sidebar({ isOpen, setIsOpen }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState({})

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '🏠',
      roles: ['ADMIN', 'RESELLER', 'MEMBER']
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: '👤',
      roles: ['ADMIN', 'RESELLER', 'MEMBER']
    },
    {
      name: 'Orders',
      href: '/orders',
      icon: '📦',
      roles: ['ADMIN', 'RESELLER', 'MEMBER']
    }
  ]

  const adminMenuItems = [
    {
      name: 'Admin Panel',
      icon: '👑',
      roles: ['ADMIN'],
      submenu: [
        {
          name: 'Admin Dashboard',
          href: '/admin',
          icon: '📊'
        },
        {
          name: 'User Management',
          href: '/admin/users',
          icon: '👥'
        },
        {
          name: 'Order Management',
          href: '/admin/orders',
          icon: '📋'
        },
        {
          name: 'System Settings',
          href: '/admin/settings',
          icon: '⚙️'
        },
        {
          name: 'Reports',
          href: '/admin/reports',
          icon: '📈'
        }
      ]
    }
  ]

  const resellerMenuItems = [
    {
      name: 'Reseller Tools',
      icon: '🛠️',
      roles: ['RESELLER'],
      submenu: [
        {
          name: 'My Products',
          href: '/reseller/products',
          icon: '📦'
        },
        {
          name: 'Sales Report',
          href: '/reseller/sales',
          icon: '💰'
        },
        {
          name: 'Customers',
          href: '/reseller/customers',
          icon: '👥'
        }
      ]
    }
  ]

  const isActive = (href) => pathname === href

  const hasRole = (roles) => {
    return roles.includes(session?.user?.role)
  }

  const MenuItem = ({ item, isSubmenu = false }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isExpanded = expandedMenus[item.name]

    if (hasSubmenu) {
      return (
        <div>
          <button
            onClick={() => toggleMenu(item.name)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isSubmenu 
                ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </div>
            <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {isExpanded && (
            <div className="ml-4 mt-2 space-y-1">
              {item.submenu.map((subItem) => (
                <MenuItem key={subItem.name} item={subItem} isSubmenu={true} />
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive(item.href)
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
            : isSubmenu
            ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ml-4'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <span className="mr-3 text-lg">{item.icon}</span>
        {item.name}
      </Link>
    )
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

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
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
                    : session?.user?.role === 'RESELLER'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                }`}>
                  {session?.user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {/* Main Menu Items */}
            {menuItems.map((item) => (
              hasRole(item.roles) && (
                <MenuItem key={item.name} item={item} />
              )
            ))}

            {/* Admin Menu */}
            {session?.user?.role === 'ADMIN' && (
              <>
                <div className="pt-4 pb-2">
                  <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Administration
                  </h3>
                </div>
                {adminMenuItems.map((item) => (
                  hasRole(item.roles) && (
                    <MenuItem key={item.name} item={item} />
                  )
                ))}
              </>
            )}

            {/* Reseller Menu */}
            {session?.user?.role === 'RESELLER' && (
              <>
                <div className="pt-4 pb-2">
                  <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Reseller Tools
                  </h3>
                </div>
                {resellerMenuItems.map((item) => (
                  hasRole(item.roles) && (
                    <MenuItem key={item.name} item={item} />
                  )
                ))}
              </>
            )}

            {/* Settings Section */}
            <div className="pt-4 pb-2">
              <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Settings
              </h3>
            </div>
            
            <Link
              href="/settings"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/settings')
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-3 text-lg">⚙️</span>
              Settings
            </Link>

            <Link
              href="/help"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive('/help')
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-3 text-lg">❓</span>
              Help & Support
            </Link>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🌙 Dark Mode
              </span>
              <ThemeToggle />
            </div>

            {/* Logout Button */}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <span className="mr-3 text-lg">🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

