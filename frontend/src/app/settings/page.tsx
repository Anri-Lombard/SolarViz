"use client"

import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

import '../styles/Settings.css'

type ColorType = 'incomerPower' | 'solarPower' | 'water';

export default function Settings() {
  const { settings, setSettings } = useSettings();

  const handleChangeColor = (type: ColorType, color: string) => {
    setSettings({
      ...settings,
      [type]: color,
    });
    // Save to local storage
    localStorage.setItem('settings', JSON.stringify({ ...settings, [type]: color }));
  };

  const renderColorOptions = (type: ColorType) => (
    <div>
      <h3>{type} Color</h3>
      {['red', 'blue', 'green', 'yellow', 'purple'].map((color) => (
        <button
          key={color}
          onClick={() => handleChangeColor(type, color)}
          className={settings[type] === color ? 'selected' : ''}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className='mainBlock'>
      <h1>Settings Page</h1>
      <p>Adjust settings</p>
      {renderColorOptions('incomerPower')}
      {renderColorOptions('solarPower')}
      {renderColorOptions('water')}
    </div>
  );
}
