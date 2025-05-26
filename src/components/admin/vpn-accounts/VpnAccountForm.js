'use client'
import { useState, useEffect } from 'react'

export default function VpnAccountForm({ account, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    protocol: 'vmess',
    uuid: '',
    domain: '',
    vpnServerId: '',
    userId: '',
    expired: '',  // ✅ Use 'expired'
    ip_limit: '1',
    quota: 'unlimited',
    status: 'ACTIVE'
  })

  const [servers, setServers] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (account) {
      setFormData({
        username: account.username || '',
        password: account.password || '',
        protocol: account.protocol || 'vmess',
        uuid: account.uuid || '',
        domain: account.domain || '',
        vpnServerId: account.vpnServerId || '',
        userId: account.userId || '',
        expired: account.expired ? new Date(account.expired).toISOString().split('T')[0] : '',  // ✅ Use 'expired'
        ip_limit: account.ip_limit || '1',
        quota: account.quota || 'unlimited',
        status: account.status || 'ACTIVE'
      })
    }
  }, [account])

  useEffect(() => {
    fetchServers()
    fetchUsers()
  }, [])

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/admin/vpn-servers')
      const data = await response.json()
      if (data.success) {
        setServers(data.data)
      }
    } catch (error) {
      console.error('Error fetching servers:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      if (data.success) {
        setUsers(data.data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate UUID jika kosong dan protocol vmess/vless
      if (!formData.uuid && ['vmess', 'vless'].includes(formData.protocol)) {
        formData.uuid = crypto.randomUUID()
      }

      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-set domain dari server yang dipilih
    if (name === 'vpnServerId') {
      const selectedServer = servers.find(s => s.id === parseInt(value))
      if (selectedServer) {
        setFormData(prev => ({
          ...prev,
          domain: selectedServer.domain
        }))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan username"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan password"
          />
        </div>

        {/* Server */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Server VPN *
          </label>
          <select
            name="vpnServerId"
            value={formData.vpnServerId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih Server</option>
            {servers.map(server => (
              <option key={server.id} value={server.id}>
                {server.nama} ({server.domain})
              </option>
            ))}
          </select>
        </div>

        {/* User (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User (Opsional)
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih User (Manual Create)</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* Protocol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Protocol
          </label>
          <select
            name="protocol"
            value={formData.protocol}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="vmess">VMess</option>
            <option value="vless">VLess</option>
            <option value="trojan">Trojan</option>
            <option value="shadowsocks">Shadowsocks</option>
          </select>
        </div>

        {/* Expired Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Expired *
          </label>
          <input
            type="date"
            name="expired"  // ✅ Use 'expired'
            value={formData.expired}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* IP Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IP Limit
          </label>
          <input
            type="text"
            name="ip_limit"
            value={formData.ip_limit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1"
          />
        </div>

        {/* Quota */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quota
          </label>
          <input
            type="text"
            name="quota"
            value={formData.quota}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="unlimited"
          />
        </div>

        {/* Status */}
        {account && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        )}

        {/* UUID (Auto-generated for vmess/vless) */}
        {['vmess', 'vless'].includes(formData.protocol) && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UUID (Auto-generated)
            </label>
            <input
              type="text"
              name="uuid"
              value={formData.uuid}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Auto-generated UUID"
            />
          </div>
        )}

        {/* Domain Override */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain (Override)
          </label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Auto-filled from server"
          />
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Menyimpan...' : account ? 'Update' : 'Buat Akun'}
        </button>
      </div>
    </form>
  )
}

