import React, { useEffect, useState, useMemo } from 'react';
import '../styles/DataDisplay.css';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';
import { StackedAreaChart } from './StackedAreaChart';

interface DataType {
  Timestamp: string;
  'UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD': string;
  'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': string;
  'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': string;
}

export default function DataDisplay() {
  const [data, setData] = useState<DataType[] | null>(null);
  const [showPieChart, setShowPieChart] = useState(true);
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
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPieChart((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);



  const aggregatedData = useMemo(() => {
    if (!data) return null;

    const tData = data.map(item => ({
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
    data.forEach((item) => {
      totalSolar += Number(item['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR']);
      totalIncomerPower += Number(item['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER']);
    });
    return {
      'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': totalSolar,
      'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': totalIncomerPower,
    };
  }, [data]);


  return (
    <div style={{ width: '100%', height: 'auto' }}>
      {transformedData && aggregatedData ? (
        <>
          {showPieChart ? (
            <>
              <h1 className="heading">
                Percentage Energy from Solar and Incomer from {startTime} to {endTime}
              </h1>
              <PieChartComponent data={aggregatedData} />
            </>
          ) : (
            <>
              <h1 className="heading">
                Energy from Solar and Incomer from {startTime} to {endTime}
              </h1>
              <StackedAreaChart data={transformedData} />
            </>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );

}
