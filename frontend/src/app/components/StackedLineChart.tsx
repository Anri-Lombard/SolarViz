import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WaterDataType {
    tstamp: string;
    'UCT D-School - First Storey - ': string;
    'UCT D-School - Ground Storey -': string;
    'UCT D-School - Second Storey -': string;
    'UCT D-School - Secondary Store': string;
}

interface StackedLineChartProps {
    data: WaterDataType[];
}

export const StackedLineChart: React.FC<StackedLineChartProps> = ({ data }) => {

    console.log(data);
    
    return (
        <ResponsiveContainer height={500}>
            <LineChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 10,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tstamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="UCT D-School - First Storey - " stroke="#1f77b4" strokeWidth={2} />
                <Line type="monotone" dataKey="UCT D-School - Ground Storey -" stroke="#ff7f0e" strokeWidth={2} />
                <Line type="monotone" dataKey="UCT D-School - Second Storey -" stroke="#2ca02c" strokeWidth={2} />
                <Line type="monotone" dataKey="UCT D-School - Secondary Store" stroke="#d62728" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};
