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

const formatWaterDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as const;
    return new Date(date).toLocaleDateString(undefined, options);
  }

export const StackedLineChart: React.FC<StackedLineChartProps> = ({ data }) => {
    const colorMapping = {
        "UCT D-School - First Storey -": "#FF0000",
        "UCT D-School - Ground Storey -": "#00FF00",
        "UCT D-School - Second Storey -": "#0000FF",
        "UCT D-School - Secondary Store": "#FFA500"
    };

    const meterDescriptions = Array.from(new Set(data.map(item => item['Meter Description'])));
    const dateHourCombinations = Array.from(new Set(data.map(item => `${item.date} ${item.hour}`)));

    // Create a new data array that consolidates the data based on unique date-hour combinations and meter descriptions
    const consolidatedData = dateHourCombinations.map(dateHour => {
        const [date, hour] = dateHour.split(' ');
        const formattedDate = formatWaterDate(date);
        const formattedDateHour = `${formattedDate} ${hour}`;
        const obj: any = { 'dateHour': formattedDateHour };
        meterDescriptions.forEach(desc => {
            const filteredData = data.filter(item => `${item.date} ${item.hour}` === dateHour && item['Meter Description'] === desc);
            const sum = filteredData.reduce((acc, curr) => acc + (curr.difference_kl * 1000), 0); // Multiply by 1000 to convert to liters
            obj[desc] = sum;
        });
        return obj;
    });

    return (
        <ResponsiveContainer height={600}>
            <LineChart
                data={consolidatedData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="dateHour" 
                    type="category" 
                    label={{ value: 'Date and Hour', position: 'bottom' }}
                />
                <YAxis 
                    label={{ value: 'Usage (L)', angle: -90, position: 'insideLeft', offset: -10 }}
                />
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="top" align="center" />
                {meterDescriptions.map((desc, index) => (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey={desc}
                        stroke={colorMapping[desc as keyof typeof colorMapping]}
                        strokeWidth={2}
                        isAnimationActive={true}
                        name={desc}
                        dot={false}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};
