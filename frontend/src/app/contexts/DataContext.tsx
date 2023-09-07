import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define your data types
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

// Define the shape of the context
interface DataContextProps {
  powerData: PowerDataType[];
  waterData: WaterDataType[];
}

// Create the context
export const DataContext = createContext<DataContextProps>({
  powerData: [],
  waterData: [],
});

// Create the provider component
export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [powerData, setPowerData] = useState<PowerDataType[]>([]);
  const [waterData, setWaterData] = useState<WaterDataType[]>([]);

  useEffect(() => {
    // Fetch power data
    fetch('http://localhost:8000/api/power_data/')
      .then((response) => response.json())
      .then((data: PowerDataType[]) => setPowerData(data));

    // Fetch water data
    fetch('http://localhost:8000/api/water_data/')
      .then((response) => response.json())
      .then((data: WaterDataType[]) => setWaterData(data));
  }, []);

  return (
    <DataContext.Provider value={{ powerData, waterData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
