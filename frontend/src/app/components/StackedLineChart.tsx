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
}

export const StackedLineChart: React.FC<StackedLineChartProps> = ({ data }) => {
    // Define a mapping between "Meter Descriptions" and colors
    const colorMapping = {
        "UCT D-School - First Storey -": "#FF0000",  // Red
        "UCT D-School - Ground Storey -": "#00FF00",  // Green
        "UCT D-School - Second Storey -": "#0000FF",  // Blue
        "UCT D-School - Secondary Store": "#FFA500"   // Orange
    };

    // Create a list of unique "Meter Descriptions"
    const meterDescriptions = Array.from(new Set(data.map(item => item['Meter Description'])));

    return (
        <ResponsiveContainer height={600}>
            <LineChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={item => `${item.date} ${item.hour}`} />
                <YAxis />
                <Tooltip />
                <Legend />
                {meterDescriptions.map((desc, index) => (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey="difference_kl"
                        stroke={colorMapping[desc as keyof typeof colorMapping]}
                        strokeWidth={2}
                        isAnimationActive={false}
                        name={desc}
                        data={data.filter(item => item['Meter Description'] === desc)}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};
