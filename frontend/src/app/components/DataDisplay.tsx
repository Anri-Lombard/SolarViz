import React, { useEffect, useState, useMemo } from 'react';
import '../styles/DataDisplay.css';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';
import { StackedLineChart } from './StackedLineChart';
import  ProgressBar from './ProgressBar';
import  ProgressBarIcon from './ProgressBarIcon';

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
    BAR: 'BAR'
  };

  const [currentChart, setCurrentChart] = useState(CHARTS.PIE);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
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


  const renderChart = (chartType: string) => {
    switch (chartType) {
      case CHARTS.PIE:
        return aggregatedData ? (
          <>
            <h1 className="heading">
              Percentage Energy from Solar and Incomer from {powerStartTime} to {powerEndTime}
            </h1>
            <PieChartComponent data={aggregatedData} colors={settings} />
          </>
        ) : null;
      case CHARTS.AREA:
        return transformedData ? (
          <>
            <h1 className="heading">
              Energy from Solar and Incomer from {powerStartTime} to {powerEndTime}
            </h1>
            <StackedAreaChart data={transformedData} colors={settings} />
          </>
        ) : null;
      case CHARTS.LINE:
        return (
          <>
            <h1 className="heading">
              Water Consumption from {waterStartTime} to {waterEndTime} for Different Storeys
            </h1>
            <StackedLineChart data={waterData} />
          </>
        );
      case CHARTS.BAR:

          return{

          }

      default:
        return null;
    }
  };

  useEffect(() => {
    let timeoutId: any;

    const updateChart = (index: number) => {
      setCurrentChartIndex(index);
      const nextIndex = (index + 1) % charts.length;
      const nextDuration = charts[nextIndex].duration * 1000;

      timeoutId = setTimeout(() => {
        updateChart(nextIndex);
      }, nextDuration);
    };

    // Start the loop
    updateChart(currentChartIndex);

    return () => {
      clearTimeout(timeoutId);  // Clear the timeout when the component unmounts
    };
  }, [settings]);


  const charts = [
    { type: CHARTS.PIE, ...settings.pieChart },
    { type: CHARTS.AREA, ...settings.areaChart },
    { type: CHARTS.LINE, ...settings.lineChart },
  ]
    .sort((a, b) => a.sequence - b.sequence)
    .filter(chart => chart.display);

  return (

    <div className='graphContainer'>
      <ProgressBar />
      <ProgressBarIcon/>
      {transformedData && aggregatedData && waterData && powerData ? (
        <>
          {renderChart(charts[currentChartIndex].type)}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
    
  );

}
