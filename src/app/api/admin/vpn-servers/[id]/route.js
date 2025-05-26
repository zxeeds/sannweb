import { NextResponse } from 'next/server'
import { VpnServerService } from '@/lib/services/vpnServerService'
import { ValidationError, BusinessError, NotFoundError } from '@/lib/utils/errors'

// GET - Get server by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    const server = await VpnServerService.getServerById(parseInt(id))
    
    return NextResponse.json({
      success: true,
      data: server
    })
  } catch (error) {
    console.error('Get server error:', error)
    
    if (error instanceof NotFoundError) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Gagal mengambil data server'
    }, { status: 500 })
  }
}

// PUT - Update server
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const data = await request.json()
    
    const server = await VpnServerService.updateServer(parseInt(id), data)
    
    return NextResponse.json({
      success: true,
      data: server,
      message: 'Server berhasil diperbarui'
    })
  } catch (error) {
    console.error('Update server error:', error)
    
    if (error instanceof ValidationError) {
      return NextResponse.json({
        success: false,
        message: error.message,
        errors: error.details
      }, { status: 400 })
    }
    
    if (error instanceof BusinessError) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: error.statusCode })
    }
    
    if (error instanceof NotFoundError) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Gagal memperbarui server'
    }, { status: 500 })
  }
}

// DELETE - Delete server
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    await VpnServerService.deleteServer(parseInt(id))
    
    return NextResponse.json({
      success: true,
      message: 'Server berhasil dihapus'
    })
  } catch (error) {
    console.error('Delete server error:', error)
    
    if (error instanceof BusinessError) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: error.statusCode })
    }
    
    if (error instanceof NotFoundError) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Gagal menghapus server'
    }, { status: 500 })
  }
}
