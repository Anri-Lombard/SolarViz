import React, { useEffect, useState, useMemo } from 'react';
import '../styles/DataDisplay.css';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';
import { StackedLineChart } from './StackedLineChart';

interface DataType {
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


interface DataDisplayProps {
  powerData: DataType[];
  waterData: WaterDataType[];
  settings: {
    incomerPower: string;
    solarPower: string;
    water: string;
  };
}

export default function DataDisplay({ powerData, waterData, settings }: DataDisplayProps) {
  const CHARTS = {
    PIE: 'PIE',
    AREA: 'AREA',
    LINE: 'LINE',
  };

  const [currentChart, setCurrentChart] = useState(CHARTS.PIE);
  // const [powerData, setPowerData] = useState<DataType[] | null>(null);
  // const [waterData, setWaterData] = useState(null);
  const [transformedData, setTransformedData] = useState<
    {
      Timestamp: string;
      'Load Power': string;
      'Solar Power': string;
      'Incomer Power': string;
    }[] | null
  >(null);
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");


  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChart((prevChart) => {
        switch (prevChart) {
          case CHARTS.PIE:
            return CHARTS.AREA;
          case CHARTS.AREA:
            return CHARTS.LINE;
          case CHARTS.LINE:
            return CHARTS.PIE;
          default:
            return CHARTS.PIE;
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const aggregatedData = useMemo(() => {
    if (!powerData || powerData.length === 0) return null;

    const tData = powerData.map(item => ({
      Timestamp: formatDate(item.Timestamp),
      'Load Power': item['UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD'],
      'Solar Power': item['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR'],
      'Incomer Power': item['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER'],
    }));

    setTransformedData(tData);
    setStartTime(tData[0].Timestamp);
    setEndTime(tData[tData.length - 1].Timestamp);

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
      {transformedData && aggregatedData && waterData && powerData ? (
        <>
          {currentChart === CHARTS.PIE && (
            <>
              <h1 className="heading">
                Percentage Energy from Solar and Incomer from {startTime} to {endTime}
              </h1>
              <PieChartComponent data={aggregatedData} colors={settings} />
            </>
          )}
          {currentChart === CHARTS.AREA && (
            <>
              <h1 className="heading">
                Energy from Solar and Incomer from {startTime} to {endTime}
              </h1>
              <StackedAreaChart data={transformedData} colors={settings} />
            </>
          )}
          {currentChart === CHARTS.LINE && (
            <>
              <h1 className="heading">
                Daily Water Consumption Over July 2023 for Different Storeys
              </h1>
              <StackedLineChart data={waterData} color={settings.water} />
            </>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );

}
