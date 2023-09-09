import React, { useState, useMemo, useEffect } from 'react';
import '../styles/MoreDataDisplay.css';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';
import { StackedLineChart } from './StackedLineChart';
import { transformPowerData } from '../utils/DataUtils';

import { DataDisplayProps, ChartWrapperProps } from '../types/dataTypes';

export default function MoreDataDisplay({ powerData, waterData, settings }: DataDisplayProps) {
  const [transformedData, setTransformedData] = useState<
    {
      Timestamp: string;
      'Load Power': string;
      'Solar Power': string;
      'Incomer Power': string;
    }[] | null
  >(null);

  const [duration, setDuration] = useState('day');
  const [showIrradiance, setShowIrradiance] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [showTargetRange, setShowTargetRange] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('Load Power');
  const [selectedMeterDescription, setSelectedMeterDescription] = useState('All');
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false);


  const [stagedSettings, setStagedSettings] = useState({
    pieChart: {
      showIrradiance: false,
    },
    areaChart: {
      duration: 'day',
      showForecast: false,
      showTargetRange: false,
      selectedPowerType: 'All',
      showPerformanceMetrics: false,
    },
    lineChart: {
      selectedMetric: 'Load Power',
      selectedMeterDescription: 'All',
    },
  });

  const applyStagedSettings = (chartType: string) => {
    switch (chartType) {
      case 'pieChart':
        setShowIrradiance(stagedSettings.pieChart.showIrradiance);
        break;
      case 'areaChart':
        setDuration(stagedSettings.areaChart.duration);
        setShowForecast(stagedSettings.areaChart.showForecast);
        setShowTargetRange(stagedSettings.areaChart.showTargetRange);
        setShowPerformanceMetrics(stagedSettings.areaChart.showPerformanceMetrics);
        break;
      case 'lineChart':
        setSelectedMetric(stagedSettings.lineChart.selectedMetric);
        setSelectedMeterDescription(stagedSettings.lineChart.selectedMeterDescription);
        break;
      default:
        break;
    }
  };

  // TODO: implement
  useEffect(() => {
    // Apply filters here and update transformedData
  }, [stagedSettings]);

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
            filters={
              <>
                <div>
                  <label>Show Irradiance: </label>
                  <input type="checkbox" checked={stagedSettings.pieChart.showIrradiance} onChange={() => setStagedSettings({ ...stagedSettings, pieChart: { showIrradiance: !stagedSettings.pieChart.showIrradiance } })} />
                </div>
                <div className="applyButtonContainer">
                  <button className="applyButton" onClick={() => applyStagedSettings('pieChart')}>Apply</button>
                </div>
              </>
            }
          />
          <ChartWrapper
            title="Energy from Solar and Incomer"
            chart={<StackedAreaChart data={transformedData} colors={settings} />}
            filters={
              <>
                <div>
                  <label>Duration: </label>
                  <select onChange={(e) => setDuration(e.target.value)} value={duration}>
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
                <div>
                  <label>Show Forecast: </label>
                  <input type="checkbox" checked={showForecast} onChange={() => setShowForecast(!showForecast)} />
                </div>
                <div>
                  <label>Show Target Range: </label>
                  <input type="checkbox" checked={showTargetRange} onChange={() => setShowTargetRange(!showTargetRange)} />
                </div>
                <div>
                  <label>Power Type: </label>
                  <select onChange={(e) => setSelectedMeterDescription(e.target.value)} value={selectedMeterDescription}>
                    <option value="All">All</option>
                    <option value="Solar">Solar</option>
                    <option value="Incomer">Incomer</option>
                    <option value="Load">Load</option>
                  </select>
                </div>
                <div className="applyButtonContainer">
                  <button className="applyButton" onClick={() => applyStagedSettings('areaChart')}>Apply</button>
                </div>
              </>
            }
          />
          <ChartWrapper
            title="Daily Water Consumption Over July 2023 for Different Storeys"
            chart={<StackedLineChart data={waterData /* or filteredWaterData */} />}
            filters={
              <>
                <div>
                  <label>Meter Description: </label>
                  <select onChange={(e) => setSelectedMeterDescription(e.target.value)} value={selectedMeterDescription}>
                    <option value="All">All</option>
                    <option value="UCT D-School - Secondary Storey - Kitchen">Secondary Storey - Kitchen</option>
                    <option value="UCT D-School - Second Storey - Toilet">Second Storey - Toilet</option>
                    <option value="UCT D-School - Second Storey - Ablution">Second Storey - Ablution</option>
                    <option value="UCT D-School - Ground Storey - Toilet">Ground Storey - Toilet</option>
                    <option value="UCT D-School - Ground Storey - Hot Ablution">Ground Storey - Hot Ablution</option>
                    <option value="UCT D-School - Ground Storey - Geyser">Ground Storey - Geyser</option>
                    <option value="UCT D-School - Ground Storey - Cold Ablution">Ground Storey - Cold Ablution</option>
                    <option value="UCT D-School - First Storey - Toilet">First Storey - Toilet</option>
                    <option value="UCT D-School - First Storey - Ablution">First Storey - Ablution</option>
                  </select>
                </div>
                <div className="applyButtonContainer">
                  <button className="applyButton" onClick={() => applyStagedSettings('lineChart')}>Apply</button>
                </div>
              </>
            }
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, chart, filters }) => (
  <div className="chartWrapper">
    <div className="chartSection">
      <h1 className="heading">{title}</h1>
      {chart}
    </div>
    <div className="textSection">
      {filters ? filters : 'Text or Filters Here'}
    </div>
  </div>
);
