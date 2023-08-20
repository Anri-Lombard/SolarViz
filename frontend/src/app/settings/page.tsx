"use client"

import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

import '../styles/Settings.css'

type ColorType = 'incomerPower' | 'solarPower' | 'water';

export default function Settings() {
  const { settings, setSettings } = useSettings();

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'gray', 'cyan', 'magenta', 'maroon', 'navy', 'olive', 'teal', 'lime', 'aqua', 'fuchsia', 'silver', 'gold', 'orange'];

  const defaultColors = {
    incomerPower: '#183d33',
    solarPower: '#bd5545',
    water: '#2779a7',
  };


  const handleChangeColor = (type: ColorType, color: string) => {
    setSettings({
      ...settings,
      [type]: color,
    });
    // Save to local storage
    localStorage.setItem('settings', JSON.stringify({ ...settings, [type]: color }));
  };

  const renderColorOptions = (type: ColorType) => (
    <div className="flex">
      <h3 className='text-black'>{type} Color</h3>
      <div className="flex flex-wrap">
        {colors.map((color) => (
          <div key={color} className="m-1">
            <button
              onClick={() => handleChangeColor(type, color)}
              className={`p-2 ${settings[type] === color ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className='mainBlock p-5'>
      <h1 className='mb-5 text-black'>Settings Page</h1>
      <p className='mb-5 text-black'>Adjust settings</p>
      <div className='mb-5'>
        <h2 className='text-black'>Default Colors</h2>
        {Object.entries(defaultColors).map(([type, color]) => (
          <div key={type} className="flex items-center mb-2">
            <span className='text-black mr-2'>{type}: </span>
            <button
              onClick={() => handleChangeColor(type as ColorType, color)}
              className={`p-2 ${settings[type as keyof typeof settings] === color ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}
              style={{ backgroundColor: color }}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          </div>
        ))}
      </div>
      <div className='mb-5'>
        {renderColorOptions('incomerPower')}
      </div>
      <div className='mb-5'>
        {renderColorOptions('solarPower')}
      </div>
      <div className='mb-5'>
        {renderColorOptions('water')}
      </div>
    </div>
  );
}
