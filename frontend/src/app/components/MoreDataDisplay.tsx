import React, { useState, useMemo, useEffect } from 'react';
import '../styles/MoreDataDisplay.css';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';
import { StackedLineChart } from './StackedLineChart';
import { transformPowerData } from '../utils/DataUtils';

import { DataDisplayProps, ChartWrapperProps, WaterDataType, PowerType } from '../types/dataTypes';

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
  const [selectedPowerType, setSelectedPowerType] = useState('All');
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false);
  const [filteredWaterData, setFilteredWaterData] = useState<WaterDataType[] | null>(null);
  const [stagedWaterData, setStagedWaterData] = useState<WaterDataType[] | null>(null);


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
      selectedMeterDescription: 'All',
    },
  });

  const applyStagedSettings = (chartType: string) => {
    switch (chartType) {
      case 'pieChart':
        setShowIrradiance(stagedSettings.pieChart.showIrradiance);
        break;
      case 'areaChart':
        // setDuration(stagedSettings.areaChart.duration);
        // setShowForecast(stagedSettings.areaChart.showForecast);
        // setShowTargetRange(stagedSettings.areaChart.showTargetRange);
        // setShowPerformanceMetrics(stagedSettings.areaChart.showPerformanceMetrics);
        setStagedSettings(
          {
            ...stagedSettings, areaChart: { ...stagedSettings.areaChart, selectedPowerType: selectedPowerType, showForecast: showForecast }
          }
        )
        break;
      case 'lineChart':
        setStagedSettings({ ...stagedSettings, lineChart: { selectedMeterDescription: selectedMeterDescription } })
        break;
      default:
        break;
    }
  };

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
            chart={<PieChartComponent data={aggregatedData} colors={settings.colors} />}
            filters={
              <>
                <div>
                  <label>Show Irradiance: </label>
                  <input type="checkbox" checked={stagedSettings.pieChart.showIrradiance} onChange={() => setStagedSettings({ ...stagedSettings, pieChart: { showIrradiance: !stagedSettings.pieChart.showIrradiance } })} />
                </div>
                <button className="applyButton" onClick={() => applyStagedSettings('pieChart')}>Apply</button>
              </>
            }
          />
          <ChartWrapper
            title="Energy from Solar and Incomer"
            chart={<StackedAreaChart data={transformedData} colors={settings.colors} selectedPowerType={stagedSettings.areaChart.selectedPowerType} showForecast={stagedSettings.areaChart.showForecast} />}
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
                  <select onChange={(e) => setSelectedPowerType(e.target.value)} value={selectedPowerType}>
                    <option value="All">All</option>
                    <option value="Solar Power">Solar Power</option>
                    <option value="Incomer Power">Incomer Power</option>
                    <option value="Load Power">Load Power</option>
                  </select>
                </div>
                <button className="applyButton" onClick={() => applyStagedSettings('areaChart')}>Apply</button>
              </>
            }
          />
          <ChartWrapper
            title="Daily Water Consumption Over July 2023 for Different Storeys"
            chart={<StackedLineChart data={stagedSettings.lineChart.selectedMeterDescription === 'All' ? waterData : waterData?.filter(item => item['Meter Description'] === stagedSettings.lineChart.selectedMeterDescription)} />}
            filters={
              <>
                <div>
                  <label>Meter Description: </label>
                  <select onChange={(e) => setSelectedMeterDescription(e.target.value)} value={selectedMeterDescription}>
                    <option value="All">All</option>
                    <option value="Secondary Storey Kitchen">Secondary Storey Kitchen</option>
                    <option value="Second Storey Toilet">Second Storey Toilet</option>
                    <option value="Second Storey Ablution">Second Storey Ablution</option>
                    <option value="Ground Storey Toilet">Ground Storey Toilet</option>
                    <option value="Ground Storey Hot Ablution">Ground Storey Hot Ablution</option>
                    <option value="Ground Storey Geyser">Ground Storey Geyser</option>
                    <option value="Ground Storey Cold Ablution">Ground Storey Cold Ablution</option>
                    <option value="First Storey Toilet">First Storey Toilet</option>
                    <option value="First Storey Ablution">First Storey Ablution</option>
                  </select>
                </div>
                <button className="applyButton" onClick={() => applyStagedSettings('lineChart')}>Apply</button>
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
