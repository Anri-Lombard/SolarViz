import React, { useState, useMemo } from 'react';
import '../styles/MoreDataDisplay.css';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';
import { StackedLineChart } from './StackedLineChart';
import { transformPowerData } from '../utils/dataUtils';

import { DataDisplayProps } from '../types/dataTypes';

export default function DataDisplay({ powerData, waterData, settings }: DataDisplayProps) {
  const [transformedData, setTransformedData] = useState<
    {
      Timestamp: string;
      'Load Power': string;
      'Solar Power': string;
      'Incomer Power': string;
    }[] | null
  >(null);

  const aggregatedData = useMemo(() => {
    if (!powerData || powerData.length === 0) return null;

    // Transform the data here
    const tData = transformPowerData(powerData);


    // Set the transformed data
    setTransformedData(tData);

    let totalSolar = 0;
    let totalIncomerPower = 0;
    powerData.forEach((item) => {
      totalSolar += Number(item['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR']);
      totalIncomerPower += Number(item['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER']);
    });
    return {
      'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': totalSolar,
      'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': totalIncomerPower,
    };
  }, [powerData]);

  return (
    <div className='graphContainer'>
      {aggregatedData && waterData && transformedData ? (
        <>
          <ChartWrapper
            title="Percentage Energy from Solar and Incomer"
            chart={<PieChartComponent data={aggregatedData} colors={settings} />}
          />
          <ChartWrapper
            title="Energy from Solar and Incomer"
            chart={<StackedAreaChart data={transformedData} colors={settings} />}
          />
          <ChartWrapper
            title="Daily Water Consumption Over July 2023 for Different Storeys"
            chart={<StackedLineChart data={waterData} />}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );

}

interface ChartWrapperProps {
  title: string;
  chart: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, chart }) => (
  <div className="chartWrapper">
    <div className="chartSection">
      <h1 className="heading">{title}</h1>
      {chart}
    </div>
    <div className="textSection">
      Text or Filters Here
    </div>
  </div>
);
