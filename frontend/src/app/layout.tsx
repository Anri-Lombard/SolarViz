"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header';
import Footer from './components/Footer';

import { SettingsProvider } from './contexts/SettingsContext';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'SolarViz',
//   description: 'Vizualise solar data',
//   icons: {
//     icon: '/favicon.ico',
//     shortcut: '/favicon.ico',
//     apple: '/apple-touch-icon.png',
//     other: {
//       rel: 'android-chrome-192x192',
//       url: '/android-chrome-192x192.png',
//     },
//   },
//   manifest: '/site.webmanifest',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SettingsProvider>
        <Header />
        <body className={inter.className}>{children}</body>
        <Footer />
      </SettingsProvider>
    </html>
  )
}
