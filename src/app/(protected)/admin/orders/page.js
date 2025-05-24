'use client'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminOrderManagement() {
  const { data: session } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [selectedOrders, setSelectedOrders] = useState([])
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Check if user is admin
  useEffect(() => {
    if (session && session.user.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
  }, [session, router])

  // Simulate data loading
  useEffect(() => {
    const loadOrders = async () => {
      setTimeout(() => {
        setOrders([
          {
            id: 'ORD-001',
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            products: ['Product A', 'Product B'],
            total: 750000,
            status: 'pending',
            paymentStatus: 'paid',
            createdAt: '2024-01-20T10:30:00Z',
            updatedAt: '2024-01-20T10:30:00Z',
            shippingAddress: 'Jl. Sudirman No. 123, Jakarta'
          },
          {
            id: 'ORD-002',
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            products: ['Product C'],
            total: 500000,
            status: 'processing',
            paymentStatus: 'paid',
            createdAt: '2024-01-19T14:20:00Z',
            updatedAt: '2024-01-20T09:15:00Z',
            shippingAddress: 'Jl. Thamrin No. 456, Jakarta'
          },
          {
            id: 'ORD-003',
            customerName: 'Bob Wilson',
            customerEmail: 'bob@example.com',
            products: ['Product A', 'Product D', 'Product E'],
            total: 1250000,
            status: 'shipped',
            paymentStatus: 'paid',
            createdAt: '2024-01-18T16:45:00Z',
            updatedAt: '2024-01-19T11:30:00Z',
            shippingAddress: 'Jl. Gatot Subroto No. 789, Jakarta'
          },
          {
            id: 'ORD-004',
            customerName: 'Alice Brown',
            customerEmail: 'alice@example.com',
            products: ['Product B'],
            total: 300000,
            status: 'delivered',
            paymentStatus: 'paid',
            createdAt: '2024-01-17T08:15:00Z',
            updatedAt: '2024-01-18T14:20:00Z',
            shippingAddress: 'Jl. Kuningan No. 321, Jakarta'
          },
          {
            id: 'ORD-005',
            customerName: 'Charlie Davis',
            customerEmail: 'charlie@example.com',
            products: ['Product F'],
            total: 150000,
            status: 'cancelled',
            paymentStatus: 'refunded',
            createdAt: '2024-01-16T12:00:00Z',
            updatedAt: '2024-01-17T10:30:00Z',
            shippingAddress: 'Jl. Senayan No. 654, Jakarta'
          }
        ])
        setLoading(false)
      }, 1000)
    }

    if (session?.user?.role === 'ADMIN') {
      loadOrders()
    }
  }, [session])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'processing': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'shipped': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      case 'delivered': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'cancelled': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'failed': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'refunded': return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    }
  }

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === filteredOrders.length 
        ? [] 
        : filteredOrders.map(order => order.id)
    )
  }

  const handleOrderAction = (action, orderId) => {
    switch (action) {
      case 'view':
        const order = orders.find(o => o.id === orderId)
        setSelectedOrder(order)
        setShowOrderModal(true)
        break
      case 'process':
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: 'processing', updatedAt: new Date().toISOString() } : order
        ))
        break
      case 'ship':
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: 'shipped', updatedAt: new Date().toISOString() } : order
        ))
        break
      case 'deliver':
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: 'delivered', updatedAt: new Date().toISOString() } : order
        ))
        break
      case 'cancel':
        if (confirm('Are you sure you want to cancel this order?')) {
          setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() } : order
          ))
        }
        break
      default:
        break
    }
  }

  const handleBulkAction = (action) => {
    switch (action) {
      case 'process':
        setOrders(prev => prev.map(order => 
          selectedOrders.includes(order.id) ? { ...order, status: 'processing', updatedAt: new Date().toISOString() } : order
        ))
        break
      case 'ship':
        setOrders(prev => prev.map(order => 
          selectedOrders.includes(order.id) ? { ...order, status: 'shipped', updatedAt: new Date().toISOString() } : order
        ))
        break
      case 'cancel':
        if (confirm(`Are you sure you want to cancel ${selectedOrders.length} orders?`)) {
          setOrders(prev => prev.map(order => 
            selectedOrders.includes(order.id) ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() } : order
          ))
        }
        break
      default:
        break
    }
    setSelectedOrders([])
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
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Management 📋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            📊 Export Orders
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            ➕ Create Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📦</div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">⏳</div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚚</div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Shipped Orders</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {orders.filter(o => o.status === 'shipped').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">💰</div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="ALL">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {selectedOrders.length > 0 && (
            <div className="flex space-x-2">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleBulkAction(e.target.value)
                    e.target.value = ''
                  }
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Bulk Actions ({selectedOrders.length})</option>
                <option value="process">Mark as Processing</option>
                <option value="ship">Mark as Shipped</option>
                <option value="cancel">Cancel Orders</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.customerEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {order.products.slice(0, 2).join(', ')}
                      {order.products.length > 2 && (
                        <span className="text-gray-500 dark:text-gray-400">
                          {' '}+{order.products.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOrderAction('view', order.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        title="View Order"
                      >
                        👁️
                      </button>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleOrderAction('process', order.id)}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                          title="Process Order"
                        >
                          ⚡
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button
                          onClick={() => handleOrderAction('ship', order.id)}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                          title="Ship Order"
                        >
                          🚚
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button
                          onClick={() => handleOrderAction('deliver', order.id)}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                          title="Mark as Delivered"
                        >
                          ✅
                        </button>
                      )}
                      {['pending', 'processing'].includes(order.status) && (
                        <button
                          onClick={() => handleOrderAction('cancel', order.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          title="Cancel Order"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Order Details - {selectedOrder.id}
                </h3>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 space-y-6">
              {/* Customer Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Customer Information</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Shipping Address:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white text-right">{selectedOrder.shippingAddress}</span>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Order Information</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Order ID:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Payment Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(selectedOrder.createdAt).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(selectedOrder.updatedAt).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Products</h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-2">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                        <span className="text-sm text-gray-900 dark:text-white">{product}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Qty: 1</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-medium text-gray-900 dark:text-white">Total:</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(selectedOrder.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleOrderAction('process', selectedOrder.id)
                      setShowOrderModal(false)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                  >
                    ⚡ Process Order
                  </button>
                )}
                {selectedOrder.status === 'processing' && (
                  <button
                    onClick={() => {
                      handleOrderAction('ship', selectedOrder.id)
                      setShowOrderModal(false)
                    }}
                    className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
                  >
                    🚚 Ship Order
                  </button>
                )}
                {selectedOrder.status === 'shipped' && (
                  <button
                    onClick={() => {
                      handleOrderAction('deliver', selectedOrder.id)
                      setShowOrderModal(false)
                    }}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                  >
                    ✅ Mark as Delivered
                  </button>
                )}
                {['pending', 'processing'].includes(selectedOrder.status) && (
                  <button
                    onClick={() => {
                      handleOrderAction('cancel', selectedOrder.id)
                      setShowOrderModal(false)
                    }}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                  >
                    ❌ Cancel Order
                  </button>
                )}
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

