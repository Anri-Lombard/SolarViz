"use client";

import React, { useEffect, useState } from 'react';
import MoreDataDisplay from '../components/MoreDataDisplay';
import LoadingSpinner from '../components/LoadingSpinner';

import { useSettings } from '../contexts/SettingsContext';

import { DataType as PowerDataType, WaterDataType } from '../types/dataTypes';

/**
 * The Home component displays the main content of the application, including power and water data.
 *
 * @returns {JSX.Element} The JSX for the Home component.
 */

export default function Home() {
  const [powerData, setPowerData] = useState<PowerDataType[]>([]);
  const [waterData, setWaterData] = useState<WaterDataType[]>([]);

  const { settings } = useSettings();

  useEffect(() => {
    async function getData() {
      const powerResponse = await fetch('http://localhost:8000/api/power_data/');
      const powerData: PowerDataType[] = await powerResponse.json();

      const waterResponse = await fetch('http://localhost:8000/api/water_data/');
      const waterData: WaterDataType[] = await waterResponse.json();

      setPowerData(powerData);
      setWaterData(waterData);
    }

    getData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {(powerData && powerData.length > 0) && (waterData && waterData.length > 0) ?
        
        <MoreDataDisplay powerData={powerData} waterData={waterData} settings={settings} />
        : <LoadingSpinner />
      }
    </div>
  );
}
