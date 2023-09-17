import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Metadata } from 'next'

import { SettingsContextType } from '../types/contextTypes';
import { Settings } from '../types/dataTypes';

/**
 * Authentication provider component responsible for managing user login state.
 *
 * @param children      Child components that need access to the authentication context.
 */

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
        colors: {
            'Incomer Power': '#ff0000',
            'Solar Power': '#00ff00',
            'Secondary Storey Kitchen': '#0000ff',
            'Second Storey Toilet': '#ffff00',
            'Second Storey Ablution': '#00ffff',
            'Ground Storey Toilet': '#ff00ff',
            'Ground Storey Hot Ablution': '#ff8000',
            'Ground Storey Geyser': '#8000ff',
            'Ground Storey Cold Ablution': '#ff0080',
            'First Storey Toilet': '#00ff80',
            'First Storey Ablution': '#8000ff',
        },
        pieChart: { sequence: 1, duration: 10, display: true },
        areaChart: { sequence: 2, duration: 10, display: true },
        lineChart: { sequence: 3, duration: 10, display: true },
        media: { 
            sequence: 4, 
            display: true, 
            audio: true 
        },
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
        console.log(newSettings)
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

