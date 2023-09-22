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

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, colors, showIrradiance }) => {

    // Prepare data for the pie chart
    let chartData = [
        { name: 'Solar [W]', value: data['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR'], color: colors['Solar Power'] },
        { name: 'Incomer Power [W]', value: data['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER'], color: colors['Incomer Power'] },
        { name: 'Irradiance [W/m²]', value: data['UCT - DSchool - Basics - Irradiance on module plane [W/m²] - G_M0'], color: '#000'}
    ];

    if (!showIrradiance) {
        chartData = chartData.filter(item => item.name !== 'Irradiance [W/m²]');
    }

    // Custom label rendering for chart segments
    const renderLabel = (entry: { percent: number }) => `${(entry.percent * 100).toFixed(0)}%`;

    return (
        <div data-testid="pieChart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PieChart
                width={window.innerWidth >= 768 ? 600 : 300} // Adjust the width for smaller screens
                height={window.innerWidth >= 768 ? 500 : 300} // Adjust the height for smaller screens
            >
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={chartData}
                    cx='50%'
                    cy='50%'
                    outerRadius="90%"
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
