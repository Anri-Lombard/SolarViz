import React, { useEffect, useState, useMemo } from 'react';
import '../styles/DataDisplay.css';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';
import { StackedLineChart } from './StackedLineChart';

import { transformPowerData, aggregateData, formatDate } from '../utils/DataUtils'


enum ChartTypes {
  PIE = 'PIE',
  AREA = 'AREA',
  LINE = 'LINE',
}

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

  const aggregatedData = useMemo(() => {
    if (!powerData || powerData.length === 0) return null;

    const transformed = transformPowerData(powerData);
    const aggregated = aggregateData(powerData);
    
    setTransformedData(transformed);
    setPowerStartTime(transformed[0].Timestamp);
    setPowerEndTime(transformed[transformed.length - 1].Timestamp);

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
    return aggregated;
  }, [powerData, waterData]);


  const renderChart = (chartType: string) => {
    switch (chartType) {
      case ChartTypes.PIE:
        return aggregatedData ? (
          <>
            <h1 className="heading">
              Percentage Energy from Solar and Incomer from {powerStartTime} to {powerEndTime}
            </h1>
            <PieChartComponent data={aggregatedData} colors={settings} />
          </>
        ) : null;
      case ChartTypes.AREA:
        return transformedData ? (
          <>
            <h1 className="heading">
              Energy from Solar and Incomer from {powerStartTime} to {powerEndTime}
            </h1>
            <StackedAreaChart data={transformedData} colors={settings} />
          </>
        ) : null;
      case ChartTypes.LINE:
        return (
          <>
            <h1 className="heading">
              Water Consumption from {waterStartTime} to {waterEndTime} for Different Storeys
            </h1>
            <StackedLineChart data={waterData} />
          </>
        );
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
    { type: ChartTypes.PIE, ...settings.pieChart },
    { type: ChartTypes.AREA, ...settings.areaChart },
    { type: ChartTypes.LINE, ...settings.lineChart },
  ]
    .sort((a, b) => a.sequence - b.sequence)
    .filter(chart => chart.display);

  return (
    <div className='graphContainer'>
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
