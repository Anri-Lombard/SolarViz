"use client"

import React from 'react';
import DataDisplay from './components/DataDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-center p-24">
      <Header />
      <DataDisplay />
      <Footer />
    </main>
  );
}
