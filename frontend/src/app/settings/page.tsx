"use client"

import React from 'react';

import { useSettings } from '../contexts/SettingsContext';

export default function Settings() {
  const { settings, setSettings } = useSettings();

  const handleChangeColor = (color: string) => {
    setSettings({ ...settings, color });
    // Save to local storage
    localStorage.setItem('settings', JSON.stringify({ ...settings, color }));
  };

  return (
    <div className='mainBlock'>
      <h1>Settings Page</h1>
      <p>Adjust settings</p>
      <button onClick={() => handleChangeColor('red')}>Red</button>
      <button onClick={() => handleChangeColor('blue')}>Blue</button>
    </div>
  );
}
