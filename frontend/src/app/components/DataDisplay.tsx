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

type GraphSettings = {
  sequence: number;
  duration: number;
  display: boolean;
};

interface DataDisplayProps {
  powerData: DataType[];
  waterData: WaterDataType[];
  settings: {
    incomerPower: string;
    solarPower: string;
    water: string;
    pieChart: GraphSettings;
    areaChart: GraphSettings;
    lineChart: GraphSettings;
  };
}

export default function DataDisplay({ powerData, waterData, settings }: DataDisplayProps) {
  const CHARTS = {
    PIE: 'PIE',
    AREA: 'AREA',
    LINE: 'LINE',
  };

  const [currentChart, setCurrentChart] = useState(CHARTS.PIE);
  const [transformedData, setTransformedData] = useState<
    {
      Timestamp: string;
      'Load Power': string;
      'Solar Power': string;
      'Incomer Power': string;
    }[] | null
  >(null);
  const [powerStartTime, setPowerStartTime] = useState("0");
  const [powerEndTime, setPowerEndTime] = useState("0");
  const [waterStartTime, setWaterStartTime] = useState("0");
  const [waterEndTime, setWaterEndTime] = useState("0");


  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


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
    setPowerStartTime(tData[0].Timestamp);
    setPowerEndTime(tData[tData.length - 1].Timestamp);

    if (waterData && waterData.length > 0) {
      setWaterStartTime(formatDate(waterData[0].date));
      setWaterEndTime(formatDate(waterData[waterData.length - 1].date));
    }

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
  }, [powerData, waterData]);

  useEffect(() => {
    const { pieChart, areaChart, lineChart } = settings;
    const charts = [
      { type: CHARTS.PIE, ...pieChart },
      { type: CHARTS.AREA, ...areaChart },
      { type: CHARTS.LINE, ...lineChart },
    ].sort((a, b) => a.sequence - b.sequence)
     .filter(chart => chart.display);
  
    let index = 0;
    const interval = setInterval(() => {
      setCurrentChart(charts[index].type);
      index = (index + 1) % charts.length;
    }, charts[index].duration * 1000);
  
    return () => clearInterval(interval);
  }, [settings]);


  return (
    <div className='graphContainer'>

      
           
      {transformedData && aggregatedData && waterData && powerData ? (
        <>
          {currentChart === CHARTS.PIE && (
            <>
              <h1 className="heading">
                Percentage Energy from Solar and Incomer from {powerStartTime} to {powerEndTime}
              </h1>
              <PieChartComponent data={aggregatedData} colors={settings} />
            </>
          )}
          {currentChart === CHARTS.AREA && (
            <>
              <h1 className="heading">
                Energy from Solar and Incomer from {powerStartTime} to {powerEndTime}
              </h1>
              <StackedAreaChart data={transformedData} colors={settings} />
            </>
          )}
          {currentChart === CHARTS.LINE && (
            <>
              <h1 className="heading">
                Water Consumption from {waterStartTime} to {waterEndTime} for Different Storeys
              </h1>
              <StackedLineChart data={waterData} />
            </>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );

}
