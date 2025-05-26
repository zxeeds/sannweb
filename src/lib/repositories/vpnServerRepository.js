import { prisma } from '@/lib/prisma'
import { NotFoundError } from '@/lib/utils/errors'

export class VpnServerRepository {
  static async findAll(filters = {}) {
    const where = {}
        
    // Apply filters
    if (filters.search) {
      where.OR = [
        { nama: { contains: filters.search, mode: 'insensitive' } },
        { domain: { contains: filters.search, mode: 'insensitive' } }
      ]
    }
        
    if (filters.stb !== undefined) {
      where.stb = filters.stb
    }
        
    if (filters.protocol) {
      where.protocol = {
        has: filters.protocol
      }
    }

    return prisma.vpnServer.findMany({
      where,
      include: {
        _count: {
          select: {
            vpnAccounts: true  // ✅ Remove duplikat
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }


  static async findById(id) {
    const server = await prisma.vpnServer.findUnique({
      where: { id },
      include: {
        vpnAccounts: {
          include: {
            user: {
              select: { 
                id: true, 
                name: true, 
                email: true,
                role: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { vpnAccounts: true }
        }
      }
    })

    if (!server) {
      throw new NotFoundError('Server VPN tidak ditemukan')
    }

    return server
  }

  static async findByDomain(domain) {
    return prisma.vpnServer.findFirst({
      where: { domain }
    })
  }

  static async create(data) {
    return prisma.vpnServer.create({
      data,
      include: {
        _count: {
          select: { vpnAccounts: true }
        }
      }
    })
  }

  static async update(id, data) {
    try {
      return await prisma.vpnServer.update({
        where: { id },
        data,
        include: {
          _count: {
            select: { vpnAccounts: true }
          }
        }
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError('Server VPN tidak ditemukan')
      }
      throw error
    }
  }

  static async delete(id) {
    try {
      return await prisma.vpnServer.delete({
        where: { id }
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError('Server VPN tidak ditemukan')
      }
      throw error
    }
  }

  static async countActiveAccounts(serverId) {
    return prisma.vpnAccount.count({
      where: {
        vpnServerId: serverId,
        status: 'ACTIVE'
      }
    })
  }

  static async updateStock(serverId, newStock) {
    return prisma.vpnServer.update({
      where: { id: serverId },
      data: { stok: newStock }
    })
  }
}
