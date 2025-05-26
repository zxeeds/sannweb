'use client'

import { useState, useEffect } from 'react'
import { Plus, Server, Edit, Trash2, Shield, DollarSign, FileText, Key, Search, Filter } from 'lucide-react'

export default function VpnServersPage() {
  const [servers, setServers] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingServer, setEditingServer] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    stb: '',
    protocol: ''
  })

  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    domain: '',
    quota: '',
    stok: '',
    hargaMember: '',
    hargaReseller: '',
    stb: false,
    protocol: [],
    deskripsi: '',
    apiUrl: '',
    apiKey: ''
  })

  const protocolOptions = ['SSH', 'VMESS', 'VLESS', 'TROJAN']

  useEffect(() => {
    fetchServers()
    fetchStats()
  }, [filters])

  const fetchServers = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      
      if (filters.search) queryParams.append('search', filters.search)
      if (filters.stb) queryParams.append('stb', filters.stb)
      if (filters.protocol) queryParams.append('protocol', filters.protocol)

      const response = await fetch(`/api/admin/vpn-servers?${queryParams}`)
      const result = await response.json()

      if (result.success) {
        setServers(result.data)
      } else {
        throw new Error(result.error || 'Failed to fetch servers')
      }
    } catch (error) {
      console.error('Error fetching servers:', error)
      alert('Gagal memuat data server: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/vpn-servers/stats')
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingServer 
        ? `/api/admin/vpn-servers/${editingServer.id}`
        : '/api/admin/vpn-servers'
      
      const method = editingServer ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          quota: parseInt(formData.quota),
          stok: parseInt(formData.stok),
          hargaMember: parseFloat(formData.hargaMember),
          hargaReseller: parseFloat(formData.hargaReseller)
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert(result.message)
        setShowModal(false)
        resetForm()
        fetchServers()
        fetchStats()
      } else {
        throw new Error(result.error || 'Operation failed')
      }
    } catch (error) {
      console.error('Error saving server:', error)
      alert('Gagal menyimpan server: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus server ini?')) return

    try {
      const response = await fetch(`/api/admin/vpn-servers/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        alert(result.message)
        fetchServers()
        fetchStats()
      } else {
        throw new Error(result.error || 'Failed to delete server')
      }
    } catch (error) {
      console.error('Error deleting server:', error)
      alert('Gagal menghapus server: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      nama: '',
      domain: '',
      quota: '',
      stok: '',
      hargaMember: '',
      hargaReseller: '',
      stb: false,
      protocol: [],
      deskripsi: '',
      apiUrl: '',
      apiKey: ''
    })
    setEditingServer(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (server) => {
    setFormData({
      nama: server.nama,
      domain: server.domain,
      quota: server.quota.toString(),
      stok: server.stok.toString(),
      hargaMember: server.hargaMember.toString(),
      hargaReseller: server.hargaReseller.toString(),
      stb: server.stb,
      protocol: server.protocol || [],
      deskripsi: server.deskripsi || '',
      apiUrl: server.apiUrl,
      apiKey: server.apiKey
    })
    setEditingServer(server)
    setShowModal(true)
  }

  const handleProtocolChange = (protocol) => {
    setFormData(prev => ({
      ...prev,
      protocol: prev.protocol.includes(protocol)
        ? prev.protocol.filter(p => p !== protocol)
        : [...prev.protocol, protocol]
    }))
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (loading && servers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Manajemen Server VPN
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola server VPN dan konfigurasi layanan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Server</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalServers || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Stok</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalStock || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Akun Aktif</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalActiveAccounts || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Server className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Server Ready</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.serversWithStock || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">STB Support</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.serversWithStb || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari server atau domain..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white w-full sm:w-64"
                />
              </div>

              {/* STB Filter */}
              <select
                value={filters.stb}
                onChange={(e) => handleFilterChange('stb', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Semua STB</option>
                <option value="true">Support STB</option>
                <option value="false">Tidak Support STB</option>
              </select>

              {/* Protocol Filter */}
              <select
                value={filters.protocol}
                onChange={(e) => handleFilterChange('protocol', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">Semua Protocol</option>
                {protocolOptions.map(protocol => (
                  <option key={protocol} value={protocol}>{protocol}</option>
                ))}
              </select>
            </div>

            {/* Add Button */}
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Server
            </button>
          </div>
        </div>
      </div>

      {/* Servers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Server
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Protocol & Features
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {servers.map((server) => (
                <tr key={server.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {server.nama}
                          </div>
                          {server.stb && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                              STB
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {server.domain}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {server._count?.vpnAccounts || 0} akun aktif
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {(server.protocol || []).map((protocol) => (
                        <span
                          key={protocol}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {protocol}
                        </span>
                      ))}
                      {(!server.protocol || server.protocol.length === 0) && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Tidak ada protocol
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {server.quota} GB
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      <div>Member: Rp {parseFloat(server.hargaMember).toLocaleString()}</div>
                      <div>Reseller: Rp {parseFloat(server.hargaReseller).toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      server.stok > 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {server.stok}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(server)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit Server"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(server.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Hapus Server"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {servers.length === 0 && (
            <div className="text-center py-12">
              <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {filters.search || filters.stb || filters.protocol 
                  ? 'Tidak ada server yang sesuai dengan filter'
                  : 'Belum ada server VPN yang ditambahkan'
                }
              </p>
              {!filters.search && !filters.stb && !filters.protocol && (
                <button
                  onClick={openAddModal}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Server Pertama
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal Form - Same as before but with better error handling */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingServer ? 'Edit Server VPN' : 'Tambah Server VPN Baru'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  Informasi Dasar
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nama Server */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Server *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => setFormData({...formData, nama: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Server Singapore 1"
                    />
                  </div>

                  {/* Domain */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Domain *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.domain}
                      onChange={(e) => setFormData({...formData, domain: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="sg1.vpnoke.com"
                    />
                  </div>

                  {/* Quota */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quota (GB) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.quota}
                      onChange={(e) => setFormData({...formData, quota: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="100"
                    />
                  </div>

                  {/* Stok */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stok *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stok}
                      onChange={(e) => setFormData({...formData, stok: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="50"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Harga
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Harga Member */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Harga Member (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1000"
                      step="100"
                      value={formData.hargaMember}
                      onChange={(e) => setFormData({...formData, hargaMember: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="15000"
                    />
                  </div>

                  {/* Harga Reseller */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Harga Reseller (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1000"
                      step="100"
                      value={formData.hargaReseller}
                      onChange={(e) => setFormData({...formData, hargaReseller: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="12000"
                    />
                  </div>
                </div>
              </div>

              {/* Features & Protocol */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Fitur & Protocol
                </h4>
                
                {/* STB Support */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.stb}
                      onChange={(e) => setFormData({...formData, stb: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Support STB (Set Top Box)
                    </span>
                  </label>
                </div>

                {/* Protocol Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Protocol yang Didukung
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {protocolOptions.map((protocol) => (
                      <label key={protocol} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.protocol.includes(protocol)}
                          onChange={() => handleProtocolChange(protocol)}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {protocol}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Deskripsi
                </h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi Server
                  </label>
                  <textarea
                    rows="3"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Server Singapore dengan kecepatan tinggi dan latency rendah..."
                  />
                </div>
              </div>

              {/* API Configuration */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Konfigurasi API
                </h4>
                
                {/* API URL */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.apiUrl}
                    onChange={(e) => setFormData({...formData, apiUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="https://api.sg1.vpnoke.com/v1"
                  />
                </div>

                {/* API Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Key *
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="sk_test_123456789..."
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      {editingServer ? 'Update Server' : 'Tambah Server'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

