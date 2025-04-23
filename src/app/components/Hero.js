import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero bg-gray-900 text-center py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Lindungi Privasi Online Anda
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Browsing aman, cepat, dan tanpa batasan dengan VPN Pro
        </p>
        <Link href="/login">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
            Dapatkan VPN Sekarang
          </button>
        </Link>
      </div>
    </section>
  )
}