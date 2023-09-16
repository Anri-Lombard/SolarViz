import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { StackedLineChartProps } from '../types/chartTypes';
import { ConsolidatedData } from '../types/dataTypes';
import { formatWaterDate } from '../utils/DataUtils';

import { useSettings } from '../contexts/SettingsContext';

/**
 * StackedLineChart displays a stacked line chart using Recharts library.
 *
 * @param {StackedLineChartProps} props     The component's props.
 * @param {ConsolidatedData[]} props.data   Data for the stacked line chart.
 * @returns {JSX.Element}                   The StackedLineChart JSX.
 */

export const StackedLineChart: React.FC<StackedLineChartProps> = ({ data }) => {
    const { settings } = useSettings();

    // Extract unique meter descriptions and date-hour combinations
    const meterDescriptions = Array.from(new Set(data.map(item => item['Meter Description'])));
    const dateHourCombinations = Array.from(new Set(data.map(item => `${item.date} ${item.hour}`)));

    // Consolidate data for the chart
    const consolidatedData: ConsolidatedData[] = dateHourCombinations.map(dateHour => {
        const [date, hour] = dateHour.split(' ');
        const formattedDate = formatWaterDate(date);
        const formattedDateHour = `${formattedDate} ${hour}`;
        const obj: any = { 'dateHour': formattedDateHour };

        // Calculate the sum of usage for each meter description
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
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
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
                        stroke={settings.colors[desc as keyof typeof settings.colors]}
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
