// src/context/ThemeContext.js
'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Cek preferensi tema saat komponen dimuat
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      // Cek preferensi sistem
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  // Update tema dan localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={isDarkMode ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}