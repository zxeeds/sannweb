import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const now = new Date()
    const weekFromNow = new Date()
    weekFromNow.setDate(now.getDate() + 7)
    
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(now.getDate() - 30)

    // Get basic counts
    const [
      totalAccounts,
      activeAccounts,
      expiredAccounts,
      suspendedAccounts,
      expiringSoon,
      recentAccounts,
      accountsByServer
    ] = await Promise.all([
      // Total accounts
      prisma.vpnAccount.count(),
      
      // Active accounts (not expired and not suspended)
      prisma.vpnAccount.count({
        where: {
          expired: { gt: now },  // ✅ Use 'expired'
          status: { not: 'SUSPENDED' }
        }
      }),
      
      // Expired accounts
      prisma.vpnAccount.count({
        where: {
          OR: [
            { expired: { lte: now } },  // ✅ Use 'expired'
            { status: 'EXPIRED' }
          ]
        }
      }),
      
      // Suspended accounts
      prisma.vpnAccount.count({
        where: { status: 'SUSPENDED' }
      }),
      
      // Expiring soon (within 7 days)
      prisma.vpnAccount.count({
        where: {
          expired: {  // ✅ Use 'expired'
            gt: now,
            lte: weekFromNow
          },
          status: { not: 'SUSPENDED' }
        }
      }),
      
      // Recent accounts (created in last 30 days)
      prisma.vpnAccount.count({
        where: {
          createdAt: { gte: thirtyDaysAgo }
        }
      }),
      
      // Accounts by server
      prisma.vpnServer.findMany({
        select: {
          id: true,
          nama: true,
          domain: true,
          _count: {
            select: { vpnAccounts: true }  // ✅ Correct relation name
          }
        },
        orderBy: { nama: 'asc' }
      })
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalAccounts,
        activeAccounts,
        expiredAccounts,
        suspendedAccounts,
        expiringSoon,
        recentAccounts,
        accountsByServer
      }
    })
  } catch (error) {
    console.error('Error fetching VPN account stats:', error)
    return NextResponse.json({
      success: false,
      error: 'Gagal memuat statistik akun VPN'
    }, { status: 500 })
  }
}
