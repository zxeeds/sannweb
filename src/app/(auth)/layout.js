// src/app/(auth)/layout.js
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sisi Kiri - Ilustrasi/Banner */}
      <div className="hidden lg:block w-1/2 bg-blue-600 relative">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
          <Image 
            src="/auth-illustration.svg" 
            alt="Authentication Illustration" 
            width={400} 
            height={400} 
            className="mb-6"
          />
          <h2 className="text-3xl font-bold mb-4">
            Selamat Datang di Aplikasi PPOB
          </h2>
          <p className="text-xl">
            Bayar tagihan, beli pulsa, dan nikmati kemudahan bertransaksi
          </p>
        </div>
      </div>

      {/* Sisi Kanan - Form Autentikasi */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt="Logo Aplikasi" 
                width={150} 
                height={50} 
              />
            </Link>
          </div>

          {/* Konten Dinamis (Login/Register/Lupa Password) */}
          <div className="bg-white shadow-md rounded-lg p-8">
            {children}
          </div>

          {/* Navigasi Tambahan */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {/* Tambahkan navigasi antara login/register */}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Metadata untuk halaman autentikasi
export const metadata = {
  title: 'Autentikasi - Aplikasi PPOB',
  description: 'Login atau daftar untuk mulai bertransaksi',
}