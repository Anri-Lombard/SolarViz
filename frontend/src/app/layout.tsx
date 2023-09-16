"use client"
// Imports required modules and components.

import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/LoginContext';
import { DataProvider } from './contexts/DataContext';


// Initializes the Inter font with the 'latin' subset.

const inter = Inter({ subsets: ['latin'] });

/**
 * Root layout component that wraps the entire application.
 * @param {React.ReactNode} children    The child components to be wrapped.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SettingsProvider>
        <AuthProvider>
          <DataProvider>
            <Header />
            <body className={inter.className}>{children}</body>
            <Footer />
          </DataProvider>
        </AuthProvider>
      </SettingsProvider>
    </html>
  );
}
