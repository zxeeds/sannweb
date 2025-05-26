// src/app/(protected)/layout.js
'use client'

import { ThemeProvider } from '@/context/ThemeContext'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'

export default function ProtectedLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">        
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 md:p-6">
                {children}
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}