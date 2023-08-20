
"use client"

import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import '../styles/Admin.css';

type ColorType = 'incomerPower' | 'solarPower' | 'water';

export default function Admin() {
  const { settings, setSettings } = useSettings();
  const [pendingChanges, setPendingChanges] = useState(settings);

  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'gray', 'cyan', 'magenta', 'maroon', 'navy', 'olive', 'teal', 'lime', 'aqua', 'fuchsia', 'silver', 'gold', 'orange']; 

  const defaultColors = {
    incomerPower: '#183d33',
    solarPower: '#bd5545',
    water: '#2779a7',
  };

  const handleChangeColor = (type: ColorType, color: string) => {
    setPendingChanges({
      ...pendingChanges,
      [type]: color,
    });
    // Save to local storage
    localStorage.setItem('settings', JSON.stringify({ ...settings, [type]: color }));
  };

  const renderColorOptions = (type: ColorType) => (
    <div className="flex flex-col mb-5">
      <h3 className='text-black font-bold'>{type} Colour</h3>
      <div className="flex flex-wrap">

        <div
          className='p-2 m-1'
          style={{
            backgroundColor: pendingChanges[type],
            width:'30px',
            height: '30px',
          }}
        ></div>

        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleChangeColor(type, color)}
            className={`p-2 m-1 ${pendingChanges[type] === color ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className='mainBlock p-5'>

      <h1 className='mb-5 text-black'>Welcome to the administration page. Here you can modify the data that is displayed on the dashboard as well as the colour scheme.</h1>
      <p className='mb-5 text-black text-xl font-bold'>Adjust colours</p>

      <div className='mb-5'>

        <div 
          onClick={() => {
            setSettings(pendingChanges);
            localStorage.setItem('settings', JSON.stringify(pendingChanges));
          }}
          className='applyButton'
        >
          Apply changes
        </div>

        <h2 className='text-black font-bold'>Default Colours:</h2>
        {Object.entries(defaultColors).map(([type, color]) => (
          <div key={type} className="flex items-center mb-2">
            <span className='text-black mr-2'>{type}: </span>
            <button 
              onClick={() => handleChangeColor(type as ColorType, color)}
              className={`p-2 ${settings[type as keyof typeof settings] === color ? 'bg-blue-500 text-white' : 'bg-gray-400 text-black'}`}
              style={{backgroundColor: color}}
            >
              {color}
            </button>
            
          </div>
        ))}
      </div>
      
      {renderColorOptions('incomerPower')}
      {renderColorOptions('solarPower')}
      {renderColorOptions('water')}
    </div>
  );
}