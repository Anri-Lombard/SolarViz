import React, { useEffect, useState, useMemo } from 'react';
import '../styles/DataDisplay.css';
import { VideoComponent } from './VideoComponent';
import { format } from 'date-fns';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';
import { StackedLineChart } from './StackedLineChart';

import { transformPowerData, aggregateData, formatDate } from '../utils/DataUtils';

import { ChartTypes } from '../types/chartTypes'
import { DataDisplayProps, TransformedDataType } from '../types/dataTypes'

import { useData } from '../contexts/DataContext';

/**
 * DataDisplay component displays various charts and data visualizations based on power and water data.
 *
 * @param {DataDisplayProps} props          The component's props.
 * @param {Array<Object>} props.powerData   An array of power data.
 * @param {Array<Object>} props.waterData   An array of water data.
 * @param {Object} props.settings           Configuration settings.
 * @returns {JSX.Element}                   The DataDisplay component JSX.
 */

export default function DataDisplay({ powerData, waterData, settings }: DataDisplayProps) {
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [transformedData, setTransformedData] = useState<
    TransformedDataType[] | null
  >(null);
  const [powerStartTime, setPowerStartTime] = useState("0");
  const [powerEndTime, setPowerEndTime] = useState("0");
  const [waterStartTime, setWaterStartTime] = useState("0");
  const [waterEndTime, setWaterEndTime] = useState("0");
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const { selectedVideo } = useData();

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

  const handleVideoDuration = (duration: number) => {
    setVideoDuration(duration);
  };

  const renderChart = (chartType: string) => {
    switch (chartType) {
      case ChartTypes.PIE:
        return aggregatedData ? (
          <div data-testid="pieChart">
            <h1 className="heading">
              Percentage Energy from Solar and Incomer from {format(new Date(powerStartTime), 'MMMM dd, yyyy')} to {format(new Date(powerEndTime), 'MMMM dd, yyyy')}
            </h1>
            <PieChartComponent data={aggregatedData} colors={settings.colors} showIrradiance={false} />
          </div>
        ) : null;
      case ChartTypes.AREA:
        return transformedData ? (
          <div data-testid="stackedAreaChart">
            <h1 className="heading">
              Energy from Solar Power and Incomer Power (grid) on {format(new Date(powerEndTime), 'MMMM dd, yyyy')}
            </h1>
            <StackedAreaChart data={transformedData} colors={settings.colors} selectedPowerType='All' showForecast={false} duration="day" />
          </div>
        ) : null;
      case ChartTypes.LINE:
        return (
          <div data-testid="stackedLineChart">
            <h1 className="heading">
              Water Consumption on {format(new Date(waterEndTime), 'MMMM dd, yyyy')} for Different Storeys
            </h1>
            <StackedLineChart data={waterData} duration="day" settings={settings} />
          </div>
        );
      // case ChartTypes.VIDEO:
      //   return <VideoComponent playWithAudio={settings.media.audio} setVideoDuration={handleVideoDuration} />;
      default:
        return null;
    }
  };
  

  const charts = [
    { type: ChartTypes.PIE, ...settings.pieChart },
    { type: ChartTypes.AREA, ...settings.areaChart },
    { type: ChartTypes.LINE, ...settings.lineChart },
    { type: ChartTypes.VIDEO, duration: videoDuration, ...settings.media },
  ]
    .sort((a, b) => a.sequence - b.sequence)
    .filter(chart => chart.display);

  useEffect(() => {
    let timeoutId: any;


    const updateChart = (index: number) => {
      setCurrentChartIndex(index);
      
      const nextIndex = (index + 1) % charts.length;
      let currentDuration = charts[index].duration! * 1000;


    
      timeoutId = setTimeout(() => {
        updateChart(nextIndex);
      }, currentDuration);
    };
    


    // Start the loop
    updateChart(currentChartIndex);

    return () => {
      clearTimeout(timeoutId);  // Clear the timeout when the component unmounts
    };
  }, [charts]);

  return (
    <div>
      {transformedData && aggregatedData && waterData && powerData ? (
        renderChart(charts[currentChartIndex].type)
      ) : (
        <LoadingSpinner />
      )}
      <VideoComponent
        videoUrl={selectedVideo}
        playWithAudio={settings.media.audio}
        setVideoDuration={handleVideoDuration}
        style={{ display: charts[currentChartIndex].type === 'VIDEO' ? 'block' : 'none' }}
      />
    </div>
  );

}
