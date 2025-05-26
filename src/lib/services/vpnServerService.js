import { VpnServerRepository } from '@/lib/repositories/vpnServerRepository'
import { VpnServerValidator } from '@/lib/validators/vpnServerValidator'
import { VpnApiClient } from '@/lib/clients/vpnApiClient'
import { BusinessError } from '@/lib/utils/errors'

export class VpnServerService {
  // ... existing methods

  // ✅ TAMBAH METHOD INI
  static async getAllServers(filters = {}) {
    return await VpnServerRepository.findAll(filters)
  }

  static async getServerById(id) {
    const validatedId = VpnServerValidator.validateId(id)
    return await VpnServerRepository.findById(validatedId)
  }

  // ... rest of existing methods
  static async createServer(data) {
    try {
      const validatedData = VpnServerValidator.validateCreate(data)
      await this.checkDomainUniqueness(validatedData.domain)
      await this.validatePricing(validatedData.hargaMember, validatedData.hargaReseller)
      
      console.log('⚠️ API connection test skipped for development')
      
      const server = await VpnServerRepository.create(validatedData)
      return server
    } catch (error) {
      console.error('Create server error:', error)
      throw error
    }
  }

  static async updateServer(id, data) {
    try {
      const validatedId = VpnServerValidator.validateId(id)
      const validatedData = VpnServerValidator.validateUpdate(data)
      
      const existingServer = await VpnServerRepository.findById(validatedId)
      if (!existingServer) {
        throw new BusinessError('Server tidak ditemukan', 404)
      }

      if (validatedData.domain && validatedData.domain !== existingServer.domain) {
        await this.checkDomainUniqueness(validatedData.domain)
      }

      const server = await VpnServerRepository.update(validatedId, validatedData)
      return server
    } catch (error) {
      console.error('Update server error:', error)
      throw error
    }
  }

  static async deleteServer(id) {
    const validId = VpnServerValidator.validateId(id)
    const server = await VpnServerRepository.findById(validId)
    
    const activeAccounts = await VpnServerRepository.countActiveAccounts(validId)
    if (activeAccounts > 0) {
      throw new BusinessError(
        `Tidak dapat menghapus server. Masih ada ${activeAccounts} akun VPN aktif.`
      )
    }
        
    const deletedServer = await VpnServerRepository.delete(validId)
    console.log(`VPN Server deleted: ${server.nama} (${server.domain})`)
    return deletedServer
  }

  static async checkDomainUniqueness(domain) {
    const existingServer = await VpnServerRepository.findByDomain(domain)
    if (existingServer) {
      throw new BusinessError(`Domain '${domain}' sudah digunakan oleh server lain`)
    }
  }

  static async validatePricing(hargaMember, hargaReseller) {
    if (hargaReseller > hargaMember) {
      throw new BusinessError('Harga reseller tidak boleh lebih tinggi dari harga member')
    }
    const minPrice = 1000
    if (hargaMember < minPrice || hargaReseller < minPrice) {
      throw new BusinessError(`Harga minimal adalah Rp ${minPrice.toLocaleString()}`)
    }
  }

  static async testApiConnection(apiUrl, apiKey) {
    const client = new VpnApiClient(apiUrl, apiKey)
    const isConnected = await client.testConnection()
        
    if (!isConnected) {
      throw new BusinessError('Tidak dapat terhubung ke API server. Periksa URL dan API Key.')
    }
  }

  static async updateStock(serverId, newStock) {
    const validId = VpnServerValidator.validateId(serverId)
        
    if (newStock < 0) {
      throw new BusinessError('Stok tidak boleh negatif')
    }
    return VpnServerRepository.updateStock(validId, newStock)
  }

  static async getServerStats() {
    const servers = await VpnServerRepository.findAll()
        
    return {
      totalServers: servers.length,
      totalStock: servers.reduce((sum, server) => sum + server.stok, 0),
      totalActiveAccounts: servers.reduce((sum, server) => sum + (server._count?.vpnAccounts || 0), 0),
      serversWithStock: servers.filter(server => server.stok > 0).length,
      serversWithStb: servers.filter(server => server.stb).length
    }
  }
}
