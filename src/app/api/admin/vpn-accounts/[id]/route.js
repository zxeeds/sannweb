import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id } = params

    const account = await prisma.vpnAccount.findUnique({
      where: { id: parseInt(id) },
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

    if (!account) {
      return NextResponse.json({
        success: false,
        error: 'Akun VPN tidak ditemukan'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: account
    })
  } catch (error) {
    console.error('Error fetching VPN account:', error)
    return NextResponse.json({
      success: false,
      error: 'Gagal memuat data akun VPN'
    }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { 
      username, 
      password, 
      protocol,
      uuid,
      domain,
      vpnServerId, 
      userId, 
      expired,  // ✅ Use 'expired'
      ip_limit,
      quota,
      status 
    } = body

    // Validasi input
    if (!username || !password || !vpnServerId || !expired) {
      return NextResponse.json({
        success: false,
        error: 'Username, password, server, dan tanggal expired wajib diisi'
      }, { status: 400 })
    }

    // Cek akun exists
    const existingAccount = await prisma.vpnAccount.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existingAccount) {
      return NextResponse.json({
        success: false,
        error: 'Akun VPN tidak ditemukan'
      }, { status: 404 })
    }

    // Cek username conflict (kecuali akun sendiri)
    const usernameConflict = await prisma.vpnAccount.findFirst({
      where: {
        username,
        id: { not: parseInt(id) }
      }
    })

    if (usernameConflict) {
      return NextResponse.json({
        success: false,
        error: 'Username sudah digunakan'
      }, { status: 400 })
    }

    const account = await prisma.vpnAccount.update({
      where: { id: parseInt(id) },
      data: {
        username,
        password,
        protocol: protocol || 'vmess',
        uuid,
        domain,
        vpnServerId,
        userId: userId || null,
        expired: new Date(expired),  // ✅ Use 'expired'
        ip_limit: ip_limit || '1',
        quota: quota || 'unlimited',
        status: status || 'ACTIVE'
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
      message: 'Akun VPN berhasil diupdate',
      data: account
    })
  } catch (error) {
    console.error('Error updating VPN account:', error)
    return NextResponse.json({
      success: false,
      error: 'Gagal mengupdate akun VPN'
    }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    // Cek akun exists
    const existingAccount = await prisma.vpnAccount.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existingAccount) {
      return NextResponse.json({
        success: false,
        error: 'Akun VPN tidak ditemukan'
      }, { status: 404 })
    }

    // Hapus akun
    await prisma.vpnAccount.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({
      success: true,
      message: 'Akun VPN berhasil dihapus'
    })
  } catch (error) {
    console.error('Error deleting VPN account:', error)
    return NextResponse.json({
      success: false,
      error: 'Gagal menghapus akun VPN'
    }, { status: 500 })
  }
}
