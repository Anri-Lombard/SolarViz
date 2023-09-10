import React, { useEffect, useState, useMemo } from 'react';
import '../styles/DataDisplay.css';
import { VideoComponent } from './VideoComponent';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';
import { StackedLineChart } from './StackedLineChart';

import { transformPowerData, aggregateData, formatDate } from '../utils/DataUtils';

import { ChartTypes } from '../types/chartTypes'
import { DataDisplayProps } from '../types/dataTypes'

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
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

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
            <PieChartComponent data={aggregatedData} colors={settings.colors} />
          </>
        ) : null;
      case ChartTypes.AREA:
        return transformedData ? (
          <>
            <h1 className="heading">
              Energy from Solar and Incomer from {powerStartTime} to {powerEndTime}
            </h1>
            <StackedAreaChart data={transformedData} colors={settings.colors} />
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
      case ChartTypes.VIDEO:
        return <VideoComponent playWithAudio={settings.media.audio} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    let timeoutId: any;

    const updateChart = (index: number) => {
      setCurrentChartIndex(index);
      const nextIndex = (index + 1) % charts.length;
      let nextDuration = charts[nextIndex].duration! * 1000;
    
      if (charts[nextIndex].type === 'VIDEO' && videoDuration !== null) {
        nextDuration = settings.media.display ? videoDuration * 1000 : 0;
      }
    
      timeoutId = setTimeout(() => {
        updateChart(nextIndex);
      }, nextDuration);
    };
    

    // Start the loop
    updateChart(currentChartIndex);

    return () => {
      clearTimeout(timeoutId);  // Clear the timeout when the component unmounts
    };
  }, [settings, videoDuration]);

  useEffect(() => {
    const video = document.getElementById('video-element') as HTMLVideoElement;

    if (video) {
      video.addEventListener('loadedmetadata', () => {
        setVideoDuration(video.duration);
      });
    }
  }, []);

  const charts = [
    { type: ChartTypes.PIE, ...settings.pieChart },
    { type: ChartTypes.AREA, ...settings.areaChart },
    { type: ChartTypes.LINE, ...settings.lineChart },
    ...(settings.media.display ? [{ type: ChartTypes.VIDEO, sequence: settings.media.sequence, display: settings.media.display, duration: videoDuration }] : []),
  ]
    .sort((a, b) => a.sequence - b.sequence)
    .filter(chart => chart.display);

  return (
    <div className='graphContainer'>
      {transformedData && aggregatedData && waterData && powerData ? (
        renderChart(charts[currentChartIndex].type)
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );

}
