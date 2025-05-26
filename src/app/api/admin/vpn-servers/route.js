import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { VpnServerService } from '@/lib/services/vpnServerService'
import { handleApiError } from '@/lib/utils/errors'

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const filters = {
      search: searchParams.get('search') || undefined,
      stb: searchParams.get('stb') === 'true' ? true : 
           searchParams.get('stb') === 'false' ? false : undefined,
      protocol: searchParams.get('protocol') || undefined
    }

    const servers = await VpnServerService.getAllServers(filters)
    
    return NextResponse.json({
      success: true,
      data: servers,
      total: servers.length
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const server = await VpnServerService.createServer(body)
    
    return NextResponse.json({
      success: true,
      message: 'Server VPN berhasil ditambahkan',
      data: server
    }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
