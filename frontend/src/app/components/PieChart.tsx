import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

import { PieChartComponentProps } from '../types/chartTypes';


/**
 * PieChartComponent displays a pie chart using Recharts library.
 *
 * @param {PieChartComponentProps} props    The component's props.
 * @param {Object} props.data               Data for the pie chart.
 * @param {Object} props.colors             Colors for chart segments.
 * @returns {JSX.Element}                   The PieChartComponent JSX.
 */

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, colors }) => {

    // Prepare data for the pie chart
    const chartData = [
        { name: 'Solar [W]', value: data['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR'], color: colors.solarPower },
        { name: 'Incomer Power [W]', value: data['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER'], color: colors.incomerPower },
    ];

    // Custom label rendering for chart segments
    const renderLabel = (entry: { percent: number }) => `${(entry.percent * 100).toFixed(0)}%`;

    return (
        <div data-testid="pie-chart-component" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart width={9000} height={500}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={chartData}
                    cx='50%'
                    cy='50%'
                    outerRadius="100%"
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
