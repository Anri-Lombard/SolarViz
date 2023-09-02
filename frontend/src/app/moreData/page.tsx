"use client";

import React, { useEffect, useState } from 'react';
import MoreDataDisplay from '../components/MoreDataDisplay';

import { useSettings } from '../contexts/SettingsContext';

interface PowerDataType {
  Timestamp: string;
  'UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD': string;
  'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': string;
  'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': string;
}

interface WaterDataType {
  date: string;
  hour: string;
  'Meter Description': string;
  difference_kl: number;
}


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
    <main className="flex items-center justify-center h-screen">
      {powerData && waterData ?
        
        <MoreDataDisplay powerData={powerData} waterData={waterData} settings={settings} />
        : <p>Loading...</p>
      }
    </main>
  );
}
