export default function Features() {
    return (
      <section id="features" className="features py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Keunggulan Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature text-center p-6 bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Keamanan Tinggi</h3>
              <p className="text-gray-300">Enkripsi end-to-end melindungi data Anda</p>
            </div>
            <div className="feature text-center p-6 bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Kecepatan Cepat</h3>
              <p className="text-gray-300">Server global untuk koneksi tercepat</p>
            </div>
            <div className="feature text-center p-6 bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Privasi Penuh</h3>
              <p className="text-gray-300">Tanpa log, tanpa pelacakan</p>
            </div>
          </div>
        </div>
      </section>
    )
  }