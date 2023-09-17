"use client"
// Imports required modules, components, and hooks.

import React from 'react';
import DataDisplay from './components/DataDisplay';

import { useSettings } from './contexts/SettingsContext';
import { useData } from './contexts/DataContext';


// Home component for the application.

export default function Home() {
  // Using the useData hook to get powerData and waterData
  const { powerData, waterData } = useData();
  
  // Using the useSettings hook to get user settings
  const { settings } = useSettings();

  return (
    <div className="flex items-center justify-center h-screen">
      {(powerData && powerData.length > 0) && (waterData && waterData.length > 0) ? (
        <div data-testid="dataDisplay">
          <DataDisplay powerData={powerData} waterData={waterData} settings={settings} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
