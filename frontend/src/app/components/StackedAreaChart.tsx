import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StackedAreaChartProps } from '../types/chartTypes';

export const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data, colors }) => {
    // Convert power data to kWh assuming the data is already aggregated per hour
    const convertedData = data.map(item => ({
        Timestamp: item.Timestamp,
        'Load Power': parseFloat(item['Load Power']) / 1000,
        'Solar Power': parseFloat(item['Solar Power']) / 1000,
        'Incomer Power': parseFloat(item['Incomer Power']) / 1000,
    }));

    return (
        <ResponsiveContainer height={600}>
            <AreaChart
                data={convertedData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 20,
                }}
            >
                <XAxis 
                    dataKey="Timestamp" 
                    label={{ value: 'Date and Hour', position: 'bottom' }}
                />
                <YAxis 
                    label={{ value: 'Usage (kW)', angle: -90, position: 'insideLeft', offset: -10 }} 
                />
                <Tooltip
                    formatter={(value: number, name: string) => {
                        return [value.toFixed(2), name];
                    }}
                />
                <Legend layout="horizontal" verticalAlign="top" align="center" />
                <Area type="monotone" dataKey="Load Power" stackId="1" stroke="#000" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="Incomer Power" stackId="2" stroke={colors.incomerPower} fill={colors.incomerPower} />
                <Area type="monotone" dataKey="Solar Power" stackId="3" stroke={colors.solarPower} fill={colors.solarPower} />
            </AreaChart>
        </ResponsiveContainer>
    );
};

