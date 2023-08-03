import React, { useEffect, useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom components
import LoadingSpinner from './LoadingSpinner';
import { PieChartComponent } from './PieChart';

interface DataType {
  Timestamp: string;
  'UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD': string;
  'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': string;
  'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': string;
}

export default function DataDisplay() {
  const [data, setData] = useState<DataType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const minMax = useMemo(() => {
    if (!data) return [0, 1];
    let min = Infinity;
    let max = -Infinity;
    data.forEach((item) => {
      Object.values(item).forEach((value) => {
        if (!isNaN(Number(value))) {
          const numValue = Number(value);
          if (numValue < min) min = numValue;
          if (numValue > max) max = numValue;
        }
      });
    });
    return [min, max];
  }, [data]);

  const aggregatedData = useMemo(() => {
    if (!data) return null;
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
      {data ? (
        <>
          <ResponsiveContainer height={500}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis domain={minMax} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD" stroke="#8884d8" dot={false} />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR" stroke="#82ca9d" dot={false} />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER" stroke="#ffc658" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer height={500}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis domain={minMax} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer height={500}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis domain={minMax} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR" stroke="#82ca9d" dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer height={500}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Timestamp" />
              <YAxis domain={minMax} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER" stroke="#ffc658" dot={false} />
            </LineChart>
          </ResponsiveContainer>

          {aggregatedData ? (
            <PieChartComponent data={aggregatedData} />
          ) : (
            <LoadingSpinner />
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
