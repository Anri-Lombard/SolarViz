"use client"

import React from 'react';
import DataDisplay from './components/DataDisplay';

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-4">Welcome to SolarViz</h1>
      </div>
      <DataDisplay />
    </main>
  );
}
