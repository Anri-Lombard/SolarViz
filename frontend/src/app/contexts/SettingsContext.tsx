import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Metadata } from 'next'

type GraphSettings = {
    sequence: number;
    duration: number;
    display: boolean;
};

type Settings = {
    incomerPower: string;
    solarPower: string;
    water: string;
    pieChart: GraphSettings;
    areaChart: GraphSettings;
    lineChart: GraphSettings;
};


type SettingsContextType = {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

type SettingsProviderProps = {
    children: ReactNode;
};

export const metadata: Metadata = {
    title: 'SolarViz',
    description: 'Vizualise solar data',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
        other: {
            rel: 'android-chrome-192x192',
            url: '/android-chrome-192x192.png',
        },
    },
    manifest: '/site.webmanifest',
}

export function SettingsProvider({ children }: SettingsProviderProps) {
    const [settings, setSettings] = useState({
      incomerPower: '#183d33',
      solarPower: '#b9544f',
      water: '#2779a7',
      pieChart: { sequence: 1, duration: 10, display: true },
      areaChart: { sequence: 2, duration: 10, display: true },
      lineChart: { sequence: 3, duration: 10, display: true },
    });
  
    return (
      <SettingsContext.Provider value={{ settings, setSettings }}>
        {children}
      </SettingsContext.Provider>
    );
  }
  
