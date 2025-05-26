import { z } from 'zod'
import { ValidationError } from '@/lib/utils/errors'

const createServerSchema = z.object({
  nama: z.string()
    .min(1, 'Nama server harus diisi')
    .max(100, 'Nama server maksimal 100 karakter'),
  domain: z.string()
    .min(1, 'Domain harus diisi')
    .max(255, 'Domain maksimal 255 karakter')
    .regex(/^[a-zA-Z0-9.-]+$/, 'Format domain tidak valid'),
  quota: z.number()
    .min(1, 'Quota minimal 1 GB')
    .max(10000, 'Quota maksimal 10000 GB'),
  apiKey: z.string()
    .min(1, 'API Key harus diisi'),
  apiUrl: z.string()
    .url('API URL tidak valid'),
  hargaMember: z.number()
    .min(0, 'Harga member tidak boleh negatif'),
  hargaReseller: z.number()
    .min(0, 'Harga reseller tidak boleh negatif'),
  stok: z.number()
    .min(0, 'Stok tidak boleh negatif')
    .max(10000, 'Stok maksimal 10000'),
  stb: z.boolean().optional().default(false),
  protocol: z.array(z.enum(['SSH', 'VMESS', 'VLESS', 'TROJAN']))
    .optional()
    .default([]),
  deskripsi: z.string()
    .max(1000, 'Deskripsi maksimal 1000 karakter')
    .optional()
})

const updateServerSchema = createServerSchema.partial()

export class VpnServerValidator {
  static validateCreate(data) {
    try {
      return createServerSchema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          'Data tidak valid',
          error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        )
      }
      throw error
    }
  }

  static validateUpdate(data) {
    try {
      return updateServerSchema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          'Data tidak valid',
          error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        )
      }
      throw error
    }
  }

  static validateId(id) {
    const parsedId = parseInt(id)
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new ValidationError('ID tidak valid')
    }
    return parsedId
  }
}
