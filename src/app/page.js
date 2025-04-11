// app/page.js
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  // Data game populer (dummy data)
  const popularGames = [
    { id: 'mobile-legends', name: 'Mobile Legends', image: '/games/ml.jpg', category: 'Mobile' },
    { id: 'free-fire', name: 'Free Fire', image: '/games/ff.jpg', category: 'Mobile' },
    { id: 'pubg-mobile', name: 'PUBG Mobile', image: '/games/pubg.jpg', category: 'Mobile' },
    { id: 'genshin-impact', name: 'Genshin Impact', image: '/games/genshin.jpg', category: 'Multi Platform' },
  ];

  // Data promo (dummy data)
  const promos = [
    { id: 'promo1', title: 'Diskon 10% Topup Mobile Legends', description: 'Berlaku hingga 30 April 2025', image: '/promos/promo1.jpg' },
    { id: 'promo2', title: 'Bonus Diamond Free Fire', description: 'Topup 100 diamonds, dapat bonus 10 diamonds', image: '/promos/promo2.jpg' },
  ];

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">TopUp Games Terpercaya</h1>
          <p className="mb-8 text-xl">Nikmati pengalaman topup game favorit dengan mudah, cepat, dan aman.</p>
          <Link 
            href="/games" 
            className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Topup Sekarang
          </Link>
        </div>
      </section>
      
      {/* Popular Games Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Game Populer</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularGames.map((game) => (
              <Link 
                key={game.id} 
                href={`/games/${game.id}`}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-video bg-gray-200">
                  {/* Nantinya akan diganti dengan Image component */}
                  <div className="h-full w-full bg-gray-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{game.name}</h3>
                  <p className="text-sm text-gray-600">{game.category}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/games" 
              className="inline-block rounded-lg border border-blue-600 px-6 py-2 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              Lihat Semua Game
            </Link>
          </div>
        </div>
      </section>
      
      {/* Promo Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Promo Terbaru</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {promos.map((promo) => (
              <div 
                key={promo.id} 
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                <div className="aspect-video bg-gray-200">
                  {/* Nantinya akan diganti dengan Image component */}
                  <div className="h-full w-full bg-gray-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-bold">{promo.title}</h3>
                  <p className="text-gray-600">{promo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Mengapa Memilih Kami</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-bold">Proses Cepat</h3>
              <p className="text-gray-600">Topup instan ke akun game Anda dalam hitungan detik</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-2 font-bold">Aman & Terpercaya</h3>
              <p className="text-gray-600">Sistem pembayaran dan transaksi yang aman 100%</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-bold">Support 24/7</h3>
              <p className="text-gray-600">Tim dukungan pelanggan siap membantu 24 jam setiap hari</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}