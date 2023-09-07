"use client";

import React from 'react';
import DataDisplay from './components/DataDisplay';

import { useSettings } from './contexts/SettingsContext';
import { useData } from './contexts/DataContext';

export default function Home() {
  const { powerData, waterData } = useData(); // Using the useData hook to get the data
  const { settings } = useSettings();

  return (
    <main className="flex items-center justify-center h-screen">
      {powerData && waterData ? (
        <>
          <DataDisplay powerData={powerData} waterData={waterData} settings={settings} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}