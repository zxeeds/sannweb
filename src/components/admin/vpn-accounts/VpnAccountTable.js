'use client'
import { useState } from 'react'
import { formatDate, formatDateTime, getDaysUntilExpiry, getStatusColor, copyToClipboard } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export default function VpnAccountTable({ accounts, loading, readOnly = true }) {
  const [copiedField, setCopiedField] = useState(null)

  const handleCopy = async (text, fieldName) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedField(fieldName)
      toast.success(`${fieldName} berhasil disalin!`)
      setTimeout(() => setCopiedField(null), 2000)
    } else {
      toast.error('Gagal menyalin ke clipboard')
    }
  }

  const getStatusBadge = (account) => {
    let status = account.status
    const daysUntilExpiry = getDaysUntilExpiry(account.expired)
    
    // Override status if expired
    if (daysUntilExpiry < 0) {
      status = 'EXPIRED'
    } else if (daysUntilExpiry <= 7 && status === 'ACTIVE') {
      status = 'EXPIRING'
    }

    const colors = getStatusColor(status)
    
    const statusText = {
      'ACTIVE': 'Aktif',
      'EXPIRED': 'Expired',
      'SUSPENDED': 'Suspended',
      'EXPIRING': 'Akan Expired'
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
        {statusText[status] || status}
      </span>
    )
  }

  const CopyButton = ({ text, label }) => (
    <button
      onClick={() => handleCopy(text, label)}
      className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
      title={`Copy ${label}`}
    >
      {copiedField === label ? (
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  )

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Data Akun VPN</h3>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Data Akun VPN</h3>
        </div>
        <div className="p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
          <p className="mt-1 text-sm text-gray-500">Tidak ada akun VPN yang ditemukan dengan filter saat ini.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Data Akun VPN</h3>
        <p className="text-sm text-gray-500 mt-1">Ditemukan {accounts.length} akun</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Domain/Server
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Protocol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expired
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dibuat
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => {
              const daysUntilExpiry = getDaysUntilExpiry(account.expired)
              
              return (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {account.username}
                          </span>
                          <CopyButton text={account.username} label="Username" />
                        </div>
                        {account.password && (
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              ••••••••
                            </span>
                            <CopyButton text={account.password} label="Password" />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{account.domain}</span>
                        <CopyButton text={account.domain} label="Domain" />
                      </div>
                      {account.vpnServer && (
                        <div className="text-xs text-gray-500 mt-1">
                          {account.vpnServer.nama}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {account.protocol?.toUpperCase() || 'N/A'}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(account)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {formatDate(account.expired)}
                      </div>
                      <div className={`text-xs ${
                        daysUntilExpiry < 0 
                          ? 'text-red-600' 
                          : daysUntilExpiry <= 7 
                          ? 'text-yellow-600' 
                          : 'text-gray-500'
                      }`}>
                        {daysUntilExpiry < 0 
                          ? `Expired ${Math.abs(daysUntilExpiry)} hari lalu`
                          : daysUntilExpiry === 0
                          ? 'Expired hari ini'
                          : `${daysUntilExpiry} hari lagi`
                        }
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {account.user ? (
                      <div>
                        <div className="text-sm text-gray-900">{account.user.name}</div>
                        <div className="text-xs text-gray-500">{account.user.email}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(account.createdAt)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
