import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SessionProvider from './components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Sann - Full-Stack Developer',
    template: '%s | Sann'
  },
  description: 'Professional full-stack developer specializing in modern web technologies.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
