"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header';
import Footer from './components/Footer';

import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/LoginContext';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SettingsProvider>
        <AuthProvider>
          <Header />
          <body className={inter.className}>{children}</body>
          <Footer />
        </AuthProvider>
      </SettingsProvider>
    </html>
  )
}
