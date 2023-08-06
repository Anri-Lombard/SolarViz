import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataType {
    Timestamp: string;
    'UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD': string;
    'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': string;
    'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': string;
}

interface StackedAreaChartProps {
    data: { Timestamp: string; 'Load Power': string; 'Solar Power': string; 'Incomer Power': string; }[];
}

export const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data }) => {

    console.log(data);
    
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
                <Area type="monotone" dataKey="Incomer Power" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="Solar Power" stackId="3" stroke="#8884d8" fill="#8884d8" />

            </AreaChart>
        </ResponsiveContainer>
    );
};
