'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalResellers: 0,
    totalMembers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    lockedUsers: 0
  })
  const [recentUsers, setRecentUsers] = useState([])
  const [systemLogs, setSystemLogs] = useState([])
  const [loading, setLoading] = useState(true)

  // Check if user is admin
  useEffect(() => {
    if (session && session.user.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
  }, [session, router])

  // Simulate data loading
  useEffect(() => {
    const loadAdminData = async () => {
      // Simulate API call
      setTimeout(() => {
        setAdminStats({
          totalUsers: 1247,
          totalAdmins: 5,
          totalResellers: 23,
          totalMembers: 1219,
          totalOrders: 3456,
          totalRevenue: 125000000,
          activeUsers: 1198,
          lockedUsers: 49
        })
        
        setRecentUsers([
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'MEMBER',
            status: 'active',
            joinDate: '2024-01-15',
            lastLogin: '2 hours ago'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'RESELLER',
            status: 'active',
            joinDate: '2024-01-14',
            lastLogin: '5 hours ago'
          },
          {
            id: 3,
            name: 'Bob Wilson',
            email: 'bob@example.com',
            role: 'MEMBER',
            status: 'locked',
            joinDate: '2024-01-13',
            lastLogin: '2 days ago'
          },
          {
            id: 4,
            name: 'Alice Brown',
            email: 'alice@example.com',
            role: 'MEMBER',
            status: 'active',
            joinDate: '2024-01-12',
            lastLogin: '1 hour ago'
          }
        ])

        setSystemLogs([
          {
            id: 1,
            type: 'security',
            message: 'Failed login attempt detected',
            user: 'unknown@example.com',
            timestamp: '2024-01-15 14:30:00',
            severity: 'warning'
          },
          {
            id: 2,
            type: 'user',
            message: 'New user registration',
            user: 'newuser@example.com',
            timestamp: '2024-01-15 14:25:00',
            severity: 'info'
          },
          {
            id: 3,
            type: 'system',
            message: 'Database backup completed',
            user: 'system',
            timestamp: '2024-01-15 14:00:00',
            severity: 'success'
          },
          {
            id: 4,
            type: 'security',
            message: 'Account locked due to multiple failed attempts',
            user: 'suspicious@example.com',
            timestamp: '2024-01-15 13:45:00',
            severity: 'error'
          }
        ])
        
        setLoading(false)
      }, 1000)
    }

    if (session?.user?.role === 'ADMIN') {
      loadAdminData()
    }
  }, [session])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }

  const AdminStatCard = ({ title, value, icon, color, subtitle, trend }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className={`text-2xl font-bold ${color}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {trend.positive ? '↗' : '↘'} {trend.value}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`text-3xl opacity-80`}>
          {icon}
        </div>
      </div>
    </div>
  )

  const AdminActionCard = ({ title, description, icon, onClick, color }) => (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-left transition-all duration-200 hover:shadow-md hover:scale-105 group"
    >
      <div className="flex items-center space-x-3">
        <div className={`text-xl ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white text-sm">
            {title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </button>
  )

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'RESELLER': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'MEMBER': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'locked': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'success': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'info': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  if (session?.user?.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard 👑
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            System overview and management tools
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            📊 Export Data
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard
          title="Total Users"
          value={adminStats.totalUsers.toLocaleString()}
          icon="👥"
          color="text-blue-600 dark:text-blue-400"
          subtitle="All registered users"
          trend={{ positive: true, value: '+12%' }}
        />
        <AdminStatCard
          title="Active Users"
          value={adminStats.activeUsers.toLocaleString()}
          icon="✅"
          color="text-green-600 dark:text-green-400"
          subtitle="Currently active"
          trend={{ positive: true, value: '+5%' }}
        />
        <AdminStatCard
          title="Total Orders"
          value={adminStats.totalOrders.toLocaleString()}
          icon="📦"
          color="text-purple-600 dark:text-purple-400"
          subtitle="All time orders"
          trend={{ positive: true, value: '+18%' }}
        />
        <AdminStatCard
          title="Total Revenue"
          value={formatCurrency(adminStats.totalRevenue)}
          icon="💰"
          color="text-yellow-600 dark:text-yellow-400"
          subtitle="All time revenue"
          trend={{ positive: true, value: '+25%' }}
        />
      </div>

      {/* User Role Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {adminStats.totalAdmins}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Admins</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {adminStats.totalResellers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Resellers</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {adminStats.totalMembers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Members</div>
          </div>
        </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {adminStats.lockedUsers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Locked</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Admin Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <AdminActionCard
              title="User Management"
              description="Manage users, roles & permissions"
              icon="👥"
              color="text-blue-500"
              onClick={() => alert('Navigate to user management')}
            />
            <AdminActionCard
              title="Order Management"
              description="View and manage all orders"
              icon="📦"
              color="text-green-500"
              onClick={() => alert('Navigate to order management')}
            />
            <AdminActionCard
              title="System Settings"
              description="Configure system parameters"
              icon="⚙️"
              color="text-purple-500"
              onClick={() => alert('Navigate to system settings')}
            />
            <AdminActionCard
              title="Reports & Analytics"
              description="View detailed reports"
              icon="📊"
              color="text-orange-500"
              onClick={() => alert('Navigate to reports')}
            />
            <AdminActionCard
              title="Security Center"
              description="Monitor security events"
              icon="🔒"
              color="text-red-500"
              onClick={() => alert('Navigate to security center')}
            />
            <AdminActionCard
              title="Backup & Restore"
              description="Manage system backups"
              icon="💾"
              color="text-indigo-500"
              onClick={() => alert('Navigate to backup management')}
            />
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Users
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {user.lastLogin}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              System Logs
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {systemLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                        {log.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {log.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        User: {log.user}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {log.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Admin Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Database</span>
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">API Services</span>
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Storage</span>
              </div>
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">75% Used</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Email Service</span>
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Backup Service</span>
              </div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">Failed</span>
            </div>
          </div>
        </div>

        {/* Recent Admin Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Admin Activities
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-sm">👤</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">Admin John</span> updated user permissions
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-sm">⚙️</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">System</span> completed daily backup
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400 text-sm">🔒</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">Admin Sarah</span> locked suspicious account
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-sm">📊</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">Admin Mike</span> generated monthly report
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-red-500 text-xl">⚠️</div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Critical System Alert
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              Backup service has failed. Last successful backup was 2 days ago. 
              <button className="font-medium underline ml-1 hover:no-underline">
                Take action now
              </button>
            </p>
          </div>
          <button className="text-red-500 hover:text-red-700 dark:hover:text-red-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

