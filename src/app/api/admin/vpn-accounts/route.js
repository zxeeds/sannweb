import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const serverId = searchParams.get('serverId') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where = {}
    
    if (search) {
      where.OR = [
        { username: { contains: search } },
        { domain: { contains: search } }
      ]
    }
    
    if (status) {
      where.status = status
    }
    
    if (serverId) {
      where.vpnServerId = parseInt(serverId)
    }

    // Get accounts with relations (using correct field names)
    const accounts = await prisma.vpnAccount.findMany({
      where,
      include: {
        vpnServer: {  // ✅ Correct relation name
          select: {
            id: true,
            nama: true,
            domain: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    })

    // Get total count
    const total = await prisma.vpnAccount.count({ where })

    return NextResponse.json({
      success: true,
      data: accounts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching VPN accounts:', error)
    return NextResponse.json({
      success: false,
      error: 'Gagal memuat data akun VPN'
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      username, 
      password, 
      protocol,
      uuid,
      domain,
      vpnServerId, 
      userId, 
      expired,  // ✅ Use 'expired' not 'expiredAt'
      ip_limit,
      quota 
    } = body

    // Validasi input
    if (!username || !password || !vpnServerId || !expired) {
      return NextResponse.json({
        success: false,
        error: 'Username, password, server, dan tanggal expired wajib diisi'
      }, { status: 400 })
    }

    // Cek username conflict
    const existingAccount = await prisma.vpnAccount.findFirst({
      where: { username }
    })

    if (existingAccount) {
      return NextResponse.json({
        success: false,
        error: 'Username sudah digunakan'
      }, { status: 400 })
    }

    // Cek server exists
    const server = await prisma.vpnServer.findUnique({
      where: { id: vpnServerId }
    })

    if (!server) {
      return NextResponse.json({
        success: false,
        error: 'Server tidak ditemukan'
      }, { status: 400 })
    }

    // Cek user exists (jika ada)
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return NextResponse.json({
          success: false,
          error: 'User tidak ditemukan'
        }, { status: 400 })
      }
    }

    // Create account
    const account = await prisma.vpnAccount.create({
      data: {
        username,
        password,
        protocol: protocol || 'vmess',
        uuid: uuid || crypto.randomUUID(),
        domain: domain || server.domain,
        vpnServerId,
        userId: userId || null,
        expired: new Date(expired),  // ✅ Use 'expired'
        ip_limit: ip_limit || '1',
        quota: quota || 'unlimited',
        config_links: {}, // Empty JSON object
        status: 'ACTIVE'
      },
      include: {
        vpnServer: {  // ✅ Correct relation name
          select: {
            id: true,
            nama: true,
            domain: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Akun VPN berhasil dibuat',
      data: account
    })
  } catch (error) {
    console.error('Error creating VPN account:', error)
    return NextResponse.json({
      success: false,
      error: 'Gagal membuat akun VPN'
    }, { status: 500 })
  }
}
