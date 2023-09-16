import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

import { DataContextProps } from '../types/contextTypes';
import { DataType, WaterDataType } from '../types/dataTypes';

/**
 * DataProvider component responsible for providing data to the application.
 *
 * @param children    Child components that need access to the data context.
 */

// Create the context
export const DataContext = createContext<DataContextProps>({
  powerData: [],
  waterData: [],
});

// Create the provider component
export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [powerData, setPowerData] = useState<DataType[]>([]);
  const [waterData, setWaterData] = useState<WaterDataType[]>([]);

  useEffect(() => {
    // Fetch power data
    fetch('http://localhost:8000/api/power_data/')
      .then((response) => response.json())
      .then((data: DataType[]) => setPowerData(data));

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
