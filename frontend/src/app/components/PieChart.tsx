import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

interface PieChartComponentProps {
    data: {
        'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': number;
        'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': number;
    };
    colors: {
        incomerPower: string;
        solarPower: string;
        water: string;
    }
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, colors }) => {
    const chartData = [
        { name: 'Solar [W]', value: data['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR'], color: colors.solarPower },
        { name: 'Incomer Power [W]', value: data['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER'], color: colors.incomerPower },
    ];

    const renderLabel = (entry: { percent: number }) => `${(entry.percent * 100).toFixed(0)}%`;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart width={1000} height={600}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={chartData}
                    cx={500}
                    cy={300}
                    outerRadius={250}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderLabel}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};
