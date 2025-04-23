// src/app/(protected)/home/page.js
import { 
  Wallet, 
  CreditCard, 
  Download, 
  Smartphone 
} from 'lucide-react'

// Simulasi data (nanti akan diganti dengan data real dari backend)
const cardData = [
  {
    icon: <Wallet className="text-blue-500" />,
    title: 'Saldo Tersedia',
    value: 'Rp 500.000',
    bgColor: 'bg-blue-50'
  },
  {
    icon: <CreditCard className="text-green-500" />,
    title: 'Total Transaksi',
    value: '24 Transaksi',
    bgColor: 'bg-green-50'
  }
]

const quickAccessMenus = [
  {
    icon: <Smartphone className="w-8 h-8 text-blue-600" />,
    title: 'Pulsa & Data',
    description: 'Beli pulsa dan paket data'
  },
  {
    icon: <Download className="w-8 h-8 text-green-600" />,
    title: 'Pembayaran',
    description: 'Bayar tagihan rutin'
  }
]

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header Dashboard */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Selamat Datang, John Doe
          </h1>
          <p className="text-gray-500">
            Berikut ringkasan aktivitas anda hari ini
          </p>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Top Up Saldo
          </button>
        </div>
      </div>

      {/* Kartu Informasi */}
      <div className="grid grid-cols-2 gap-4">
        {cardData.map((card, index) => (
          <div 
            key={index} 
            className={`${card.bgColor} p-4 rounded-lg shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                {card.icon}
                <p className="text-gray-600 mt-2">{card.title}</p>
                <h2 className="text-xl font-bold text-gray-800">
                  {card.value}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickAccessMenus.map((menu, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                {menu.icon}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {menu.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {menu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Riwayat Transaksi Terakhir */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Transaksi Terakhir</h2>
          <a href="/transaksi/riwayat" className="text-blue-500 hover:underline">
            Lihat Semua
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex justify-between text-gray-700">
              <span>Beli Pulsa - 081234567890</span>
              <span className="text-green-500">Rp 50.000</span>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex justify-between text-gray-700">
              <span>Bayar Listrik</span>
              <span className="text-green-500">Rp 250.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Dashboard - Aplikasi PPOB',
  description: 'Ringkasan aktivitas dan transaksi'
}