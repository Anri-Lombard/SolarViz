import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

interface PieChartComponentProps {
    data: {
        'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': number;
        'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': number;
    };
}

const COLORS = ['#0088FE', '#00C49F'];

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
    const chartData = [
        { name: 'Solar [W]', value: data['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR'] },
        { name: 'Incomer Power [W]', value: data['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER'] },
    ];

    const totalValue = chartData.reduce((prev, curr) => prev + curr.value, 0);

    const renderLabel = (entry: { percent: number }) => `${(entry.percent * 100).toFixed(0)}%`;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <PieChart width={800} height={800}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={chartData}
                    cx={400}
                    cy={400}
                    outerRadius={200}
                    fill="#8884d8"
                    labelLine={false}
                    label={renderLabel}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${((value / totalValue) * 100).toFixed(2)}%`} />
                <Legend />
            </PieChart>
        </div>
    );
};


