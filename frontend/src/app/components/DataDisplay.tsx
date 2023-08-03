import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataType {
  Timestamp: string;
  'Load Power [W]': string;
  'Solar [W]': string;
  'Incomer Power [W]': string;
}

export default function DataDisplay() {
  const [data, setData] = useState<DataType[] | null>(null);
  const [showSingleChart, setShowSingleChart] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const toggleChartDisplay = () => {
    setShowSingleChart(!showSingleChart);
  };

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <button onClick={toggleChartDisplay}>
        {showSingleChart ? 'Show Multiple Charts' : 'Show Single Chart'}
      </button>
      {data ? (
        showSingleChart ? (
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD" stroke="#8884d8" dot={false} />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR" stroke="#82ca9d" dot={false} />
              <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER" stroke="#ffc658" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
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
                <YAxis />
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
                <YAxis />
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
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER" stroke="#ffc658" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
