import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WaterDataType {
    tstamp: string;
    'Total Consumption': number;
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
                <Line type="monotone" dataKey="Total Consumption" stroke="#1f77b4" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};
