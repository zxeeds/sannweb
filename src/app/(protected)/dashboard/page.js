'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session } = useSession()

  const getRoleSpecificContent = () => {
    switch (session?.user?.role) {
      case 'ADMIN':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="text-3xl mr-4">👑</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Panel</h3>
                  <p className="text-gray-600 dark:text-gray-400">Manage system and users</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/users" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="text-3xl mr-4">👥</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
                  <p className="text-gray-600 dark:text-gray-400">Manage all users</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/orders" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="text-3xl mr-4">📋</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Management</h3>
                  <p className="text-gray-600 dark:text-gray-400">Manage all orders</p>
                </div>
              </div>
            </Link>
          </div>
        )
      case 'RESELLER':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="text-3xl mr-4">💰</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400">Track your sales</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="text-3xl mr-4">📦</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Products</h3>
                  <p className="text-gray-600 dark:text-gray-400">Manage your products</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="text-3xl mr-4">👥</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Customers</h3>
                  <p className="text-gray-600 dark:text-gray-400">Manage customers</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'MEMBER':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="text-3xl mr-4">🛒</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Orders</h3>
                  <p className="text-gray-600 dark:text-gray-400">View your order history</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="text-3xl mr-4">💳</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Methods</h3>
                  <p className="text-gray-600 dark:text-gray-400">Manage payment options</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="text-3xl mr-4">🎁</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rewards</h3>
                  <p className="text-gray-600 dark:text-gray-400">Check your rewards</p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👤</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Welcome to Dashboard
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Your role-specific content will appear here.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {session?.user?.name}! 👋
            </h1>
            <p className="text-blue-100">
              You're logged in as {session?.user?.role?.toLowerCase()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-2">
              {session?.user?.role === 'ADMIN' ? '👑' : 
               session?.user?.role === 'RESELLER' ? '💼' : '👤'}
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
              {session?.user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📊</div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {session?.user?.role === 'ADMIN' ? '1,234' : 
                 session?.user?.role === 'RESELLER' ? '89' : '12'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">💰</div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {session?.user?.role === 'ADMIN' ? 'Total Revenue' : 
                 session?.user?.role === 'RESELLER' ? 'My Earnings' : 'Total Spent'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {session?.user?.role === 'ADMIN' ? 'Rp 45.2M' : 
                 session?.user?.role === 'RESELLER' ? 'Rp 8.9M' : 'Rp 2.1M'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">
              {session?.user?.role === 'ADMIN' ? '👥' : 
               session?.user?.role === 'RESELLER' ? '📦' : '⭐'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {session?.user?.role === 'ADMIN' ? 'Total Users' : 
                 session?.user?.role === 'RESELLER' ? 'Products' : 'Rewards Points'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {session?.user?.role === 'ADMIN' ? '5,678' : 
                 session?.user?.role === 'RESELLER' ? '45' : '1,250'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📈</div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">+12.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role-specific Content */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        {getRoleSpecificContent()}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {session?.user?.role === 'ADMIN' ? (
            <>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-sm">👤</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    New user <span className="font-medium">John Doe</span> registered
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-sm">💰</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Payment of <span className="font-medium">Rp 500,000</span> received
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
                </div>
              </div>
            </>
          ) : session?.user?.role === 'RESELLER' ? (
            <>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-sm">📦</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Order <span className="font-medium">#12345</span> completed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-sm">👥</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    New customer <span className="font-medium">Jane Smith</span> added
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-sm">✅</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Your order <span className="font-medium">#67890</span> has been shipped
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 text-sm">⭐</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    You earned <span className="font-medium">50 reward points</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* System Status (Admin only) */}
      {session?.user?.role === 'ADMIN' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Database</span>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">Healthy</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">API</span>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Storage</span>
              </div>
              <span className="text-sm text-yellow-600 dark:text-yellow-400">75% Used</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
