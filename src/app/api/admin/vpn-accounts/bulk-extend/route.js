import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const body = await request.json()
    const { accountIds, days } = body

    if (!accountIds || !Array.isArray(accountIds) || accountIds.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'ID akun harus berupa array dan tidak boleh kosong'
      }, { status: 400 })
    }

    if (!days || days <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Jumlah hari harus lebih dari 0'
      }, { status: 400 })
    }

    // Update semua akun yang dipilih
    const updatePromises = accountIds.map(async (accountId) => {
      const account = await prisma.vpnAccount.findUnique({
        where: { id: accountId }
      })

      if (!account) return null

      // Extend dari tanggal expired saat ini
      const currentExpiry = new Date(account.expired)  // ✅ Use 'expired'
      const newExpiry = new Date(currentExpiry)
      newExpiry.setDate(currentExpiry.getDate() + days)

      return prisma.vpnAccount.update({
        where: { id: accountId },
        data: {
          expired: newExpiry,  // ✅ Use 'expired'
          status: 'ACTIVE' // Set ke active jika sebelumnya expired
        }
      })
    })

    const results = await Promise.all(updatePromises)
    const successCount = results.filter(result => result !== null).length

    return NextResponse.json({
      success: true,
      message: `${successCount} akun berhasil diperpanjang ${days} hari`,
      data: { successCount, totalRequested: accountIds.length }
    })
  } catch (error) {
    console.error('Error bulk extending accounts:', error)
    return NextResponse.json({
      success: false,
      error: 'Gagal memperpanjang akun VPN'
    }, { status: 500 })
  }
}
