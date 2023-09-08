import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Metadata } from 'next'

import { SettingsContextType } from '../types/contextTypes';
import { Settings } from '../types/dataTypes';


export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

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
    const [settings, setSettings] = useState<Settings>({
        incomerPower: '#183d33',
        solarPower: '#b9544f',
        water: '#2779a7',
        pieChart: { sequence: 1, duration: 10, display: true },
        areaChart: { sequence: 2, duration: 10, display: true },
        lineChart: { sequence: 3, duration: 10, display: true },
        media: { sequence: 4, display: true, audio: true },
      });
      

    // Fetch settings from the backend when the component mounts
    useEffect(() => {
        fetch('http://localhost:8000/api/get_global_settings/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSettings(data);
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    }, []);

    // Function to update settings in the backend
    const updateSettings = (newSettings: Settings, token: string) => {
        fetch('http://localhost:8000/api/update_global_settings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(newSettings),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unauthorized');
            }
        })
        .then(data => setSettings(newSettings))
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };
    

    return (
        <SettingsContext.Provider value={{ settings, setSettings: updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

