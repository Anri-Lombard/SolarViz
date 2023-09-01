import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WaterDataType {
    date: string;
    hour: string;
    'Meter Description': string;
    difference_kl: number;
}

interface StackedLineChartProps {
    data: WaterDataType[];
    color: string;
}

export const StackedLineChart: React.FC<StackedLineChartProps> = ({ data, color }) => {

    console.log(data);

    return (
        <ResponsiveContainer height={600}>
            <LineChart
                data={data}
                margin={{
                    top: 10,
                    right: 0,
                    left: 20,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={item => `${item.date} ${item.hour}`} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="difference_kl" stroke={color} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};
