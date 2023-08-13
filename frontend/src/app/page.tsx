"use client";

import React, { useEffect, useState } from 'react';
import DataDisplay from './components/DataDisplay';
import Header from './components/Header';
import Footer from './components/Footer';

interface PowerDataType {
  Timestamp: string;
  'UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD': string;
  'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': string;
  'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': string;
}

interface WaterDataType {
  tstamp: string;
  'Total Consumption': number;
}


export default function Home() {
  const [powerData, setPowerData] = useState<PowerDataType[]>([]);
  const [waterData, setWaterData] = useState<WaterDataType[]>([]);

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
    <main className="min-h-screen items-center justify-center p-24">
      {powerData && waterData ? 
        <DataDisplay powerData={powerData} waterData={waterData} />
        : <p>Loading...</p>
      }
    </main>
  );
}
