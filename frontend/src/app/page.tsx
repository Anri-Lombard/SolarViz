"use client"
// Imports required modules, components, and hooks.

import React from 'react';
import DataDisplay from './components/DataDisplay';
import LoadingSpinner from './components/LoadingSpinner';

import { useSettings } from './contexts/SettingsContext';
import { useData } from './contexts/DataContext';

import Image from 'next/image';
import './styles/Dashboard.css';

// Home component for the application.

export default function Home() {
  // Using the useData hook to get powerData and waterData
  const { powerData, waterData } = useData();
  
  // Using the useSettings hook to get user settings
  const { settings } = useSettings();

  return (
    <div className="dashboard">
      <div className='leftMarginContainer'>
        <Image src="/images/solarPanelPicture.png" alt="Solar Panel" width={300} height={400} />
        <Image src="/images/d-skoolPicture.png" alt="D-skool" width={400} height={400} />
      </div>
      
      <div className="middleContainer">
        {(powerData && powerData.length > 0) && (waterData && waterData.length > 0) ? (
          <div data-testid="dataDisplay">
            <DataDisplay powerData={powerData} waterData={waterData} settings={settings} />
          </div>
        ) : (
          // <LoadingSpinner />
          <p>Loading...</p>
          // <div>
          //   <LoadingSpinner />
          // </div>
        )}
      </div>

      <div className='rightMarginContainer'>
        <Image src="/images/storeysPicture.png" alt="D-skool Storeys" width={300} height={300}/>
        <div className='energySavingTipsContainer'>
          <h1>Energy Saving Tips:</h1>
          <ol>
            <li>
              <div className='iconAndText'>
                <Image className="icon" width={70} height={70} src="/images/sun.png" alt = "sun"/>
                <h2>Lights Off, Natural Light On:</h2> 
              </div>
              Use natural light and turn off lights when not needed.
            </li>

            <li>
              <div className='iconAndText'>
                <Image className="icon" width={70} height={70} src="/images/water.png" alt = "waterDrop"/>
                <h2>Water Wise:</h2>
              </div>
              Conserve water and report any leaks promptly.
            </li>
            <li>
              <div className='iconAndText'>
                <Image className="icon" width={70} height={70} src="/images/recycle.png" alt = "recycle"/>
                <h2>Reduce, Reuse, Recycle:</h2>
              </div>
              Follow recycling guidelines and reduce single-use plastics.
            </li>
          </ol>
        </div>
      </div>
  
    </div>
  );
}
