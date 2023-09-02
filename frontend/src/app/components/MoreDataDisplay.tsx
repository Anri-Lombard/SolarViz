import React, { useEffect, useState, useMemo } from 'react';
import '../styles/MoreDataDisplay.css';

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
        const tData = powerData.map(item => ({
            Timestamp: formatDate(item.Timestamp),
            'Load Power': item['UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD'],
            'Solar Power': item['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR'],
            'Incomer Power': item['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER'],
        }));

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
              <div className="chartWrapper">
                <div className="chartSection">
                  <h1 className="heading">Percentage Energy from Solar and Incomer</h1>
                  <PieChartComponent data={aggregatedData} colors={settings} />
                </div>
                <div className="textSection">
                  Text or Filters Here
                </div>
              </div>
              <div className="chartWrapper">
                <div className="chartSection">
                  <h1 className="heading">Energy from Solar and Incomer</h1>
                  <StackedAreaChart data={transformedData} colors={settings} />
                </div>
                <div className="textSection">
                  Text or Filters Here
                </div>
              </div>
              <div className="chartWrapper">
                <div className="chartSection">
                  <h1 className="heading">Daily Water Consumption Over July 2023 for Different Storeys</h1>
                  <StackedLineChart data={waterData} />
                </div>
                <div className="textSection">
                  Text or Filters Here
                </div>
              </div>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      );

}
