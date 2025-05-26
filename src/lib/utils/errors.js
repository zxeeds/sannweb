import { NextResponse } from 'next/server'

export class BusinessError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.name = 'BusinessError'
    this.statusCode = statusCode
  }
}

export class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message)
    this.name = 'ValidationError'
    this.statusCode = 400
    this.errors = errors
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}

export function handleApiError(error) {
  console.error('API Error:', error)

  if (error instanceof ValidationError) {
    return NextResponse.json({
      error: error.message,
      details: error.errors
    }, { status: error.statusCode })
  }

  if (error instanceof BusinessError || error instanceof NotFoundError) {
    return NextResponse.json({
      error: error.message
    }, { status: error.statusCode })
  }

  // Prisma errors
  if (error.code === 'P2025') {
    return NextResponse.json({
      error: 'Data tidak ditemukan'
    }, { status: 404 })
  }

  if (error.code === 'P2002') {
    return NextResponse.json({
      error: 'Data sudah ada (duplicate)'
    }, { status: 409 })
  }

  // Default error
  return NextResponse.json({
    error: 'Internal server error'
  }, { status: 500 })
}
