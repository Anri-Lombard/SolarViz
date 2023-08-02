import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  return (
    <div style={{ width: '100%', height: 500 }}>
      {data ? (
        <ResponsiveContainer>
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
            <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR" stroke="#82ca9d" />
            <Line type="monotone" dataKey="UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
