import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 dark:bg-gray-800 shadow-md">
      <div className="logo">
        <h1 className="text-2xl font-bold text-white">VPN Pro</h1>
      </div>
      <div className="nav-links flex space-x-6">
        <a href="#features" className="text-gray-300 hover:text-white transition">Fitur</a>
        <a href="#pricing" className="text-gray-300 hover:text-white transition">Harga</a>
        <a href="#about" className="text-gray-300 hover:text-white transition">Tentang</a>
      </div>
      <div className="actions">
        <Link href="/auth/login">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
            Mulai Sekarang
          </button>
        </Link>
      </div>
    </nav>
  )
}