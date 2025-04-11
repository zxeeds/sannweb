// app/user/profile/page.js
"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect jika belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  // Mengisi form dengan data user
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || '',
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat memperbarui profil');
      }

      setMessage({ 
        type: 'success', 
        text: 'Profil berhasil diperbarui' 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message 
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold md:text-3xl">Profil Saya</h1>
          
          {message.text && (
            <div className={`mb-6 rounded-lg p-4 ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
          
          <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label 
                  htmlFor="name" 
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="email" 
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-3"
                  disabled
                />
                <p className="mt-1 text-sm text-gray-500">
                  Email tidak dapat diubah
                </p>
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="phone" 
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Pengaturan Keamanan</h2>
            
            <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6">
                <h3 className="mb-1 font-medium">Ubah Password</h3>
                <p className="text-sm text-gray-600">
                  Anda dapat mengubah password akun Anda untuk keamanan yang lebih baik
                </p>
                <button
                  className="mt-3 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  onClick={() => router.push('/user/change-password')}
                >
                  Ubah Password
                </button>
              </div>
              
              <div>
                <h3 className="mb-1 font-medium">Verifikasi Dua Faktor</h3>
                <p className="text-sm text-gray-600">
                  Aktifkan verifikasi dua faktor untuk keamanan tambahan
                </p>
                <button
                  className="mt-3 rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  Aktifkan 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}