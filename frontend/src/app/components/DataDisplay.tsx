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
import { DataDisplayProps, TransformedDataType } from '../types/dataTypes'

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
          <>
            <h1 className="heading">
              Percentage Energy from Solar and Incomer from {powerStartTime} to {powerEndTime}
            </h1>
            <PieChartComponent data={aggregatedData} colors={settings.colors} showIrradiance={false} />
          </>
        ) : null;
      case ChartTypes.AREA:
        return transformedData ? (
          <>
            <h1 className="heading">
              Energy from Solar Power and Incomer Power (grid) on {powerEndTime}
            </h1>
            <StackedAreaChart data={transformedData} colors={settings.colors} selectedPowerType='All' showForecast={false} duration="day" />
          </>
        ) : null;
      case ChartTypes.LINE:
        return (
          <>
            <h1 className="heading">
              Water Consumption on {waterEndTime} for Different Storeys
            </h1>
            <StackedLineChart data={waterData} duration="day"/>
          </>
        );
      // case ChartTypes.VIDEO:
      //   return <VideoComponent playWithAudio={settings.media.audio} setVideoDuration={handleVideoDuration} />;
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

  const charts = [
    { type: ChartTypes.PIE, ...settings.pieChart },
    { type: ChartTypes.AREA, ...settings.areaChart },
    { type: ChartTypes.LINE, ...settings.lineChart },
    { type: ChartTypes.VIDEO, duration: videoDuration, ...settings.media },
  ]
    .sort((a, b) => a.sequence - b.sequence)
    .filter(chart => chart.display);

  return (
    <div>
      {transformedData && aggregatedData && waterData && powerData ? (
        renderChart(charts[currentChartIndex].type)
      ) : (
        <LoadingSpinner />
      )}
      <VideoComponent
        playWithAudio={settings.media.audio}
        setVideoDuration={handleVideoDuration}
        style={{ display: currentChartIndex === charts.findIndex(c => c.type === ChartTypes.VIDEO) ? 'block' : 'none' }}
      />
    </div>
  );

}
