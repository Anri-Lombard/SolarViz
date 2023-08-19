import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StackedAreaChartProps {
    data: { Timestamp: string; 'Load Power': string; 'Solar Power': string; 'Incomer Power': string; }[];
    colors: {
        incomerPower: string;
        solarPower: string;
        water: string;
    }
}

export const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data, colors }) => {
    
    return (
        <ResponsiveContainer height={500}>
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 10,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Timestamp" />
                <YAxis />
                <Tooltip
                    formatter={(value: number, name: string) => {
                        switch (name) {
                            case 'Load Power':
                                return [value, 'Load Power'];
                            case 'Solar Power':
                                return [value, 'Solar Power'];
                            case 'Incomer Power':
                                return [value, 'Incomer Power'];
                            default:
                                return [value, name];
                        }
                    }}
                />
                <Legend />
                <Area type="monotone" dataKey="Load Power" stackId="1" stroke="#000" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="Incomer Power" stackId="2" stroke={colors.incomerPower} fill={colors.incomerPower} />
                <Area type="monotone" dataKey="Solar Power" stackId="3" stroke={colors.solarPower} fill={colors.solarPower} />

            </AreaChart>
        </ResponsiveContainer>
    );
};
