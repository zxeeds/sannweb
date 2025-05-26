import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/route'
import { VpnServerService } from '@/lib/services/vpnServerService'
import { handleApiError } from '@/lib/utils/errors'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const stats = await VpnServerService.getServerStats()
    
    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    return handleApiError(error)
  }
}
