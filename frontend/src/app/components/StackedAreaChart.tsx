import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StackedAreaChartProps } from '../types/chartTypes';
import { getTickFormatter } from '../utils/DataUtils';

import LoadingSpinner from './LoadingSpinner';

/**
 * StackedAreaChart displays a stacked area chart using Recharts library.
 *
 * @param {StackedAreaChartProps} props     The component's props.
 * @param {Object[]} props.data             Data for the stacked area chart.
 * @param {Object} props.colors             Colors for chart areas.
 * @returns {JSX.Element}                   The StackedAreaChart JSX.
 */
export const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data, colors, selectedPowerType, showForecast, duration }) => {
    const tickFormatter = useMemo(() => getTickFormatter(duration), [duration]);
    
    if (!data || data.length === 0) {
        return <LoadingSpinner />;
    }
    
    // Convert power data to kWh assuming the data is already aggregated per hour
    const convertedData = data.map(item => ({
        Timestamp: new Date(item.Timestamp),
        'Load Power': parseFloat(item['Load Power']) / 1000,
        'Solar Power': parseFloat(item['Solar Power']) / 1000,
        'Incomer Power': parseFloat(item['Incomer Power']) / 1000,
        'Expected Power': parseFloat(item['Expected Power']) / 1000,
    }));

    // Sort data by Timestamp
    convertedData.sort((a, b) => a.Timestamp.getTime() - b.Timestamp.getTime());

    // Identify the last timestamp
    const lastTimestamp = new Date(convertedData[convertedData.length - 1].Timestamp);

    // Filter data based on duration and last timestamp
    const filteredData = convertedData.filter(item => {
        if (duration === 'day') {
            return item.Timestamp.getDate() === lastTimestamp.getDate() &&
                   item.Timestamp.getMonth() === lastTimestamp.getMonth() &&
                   item.Timestamp.getFullYear() === lastTimestamp.getFullYear();
        } else if (duration === 'month') {
            return item.Timestamp.getMonth() === lastTimestamp.getMonth() &&
                   item.Timestamp.getFullYear() === lastTimestamp.getFullYear();
        } else if (duration === 'year') {
            return item.Timestamp.getFullYear() === lastTimestamp.getFullYear();
        }
        return true;
    });

    // FIXME: X-axis
    
    return (
        <ResponsiveContainer height={500} width={500}>
            <AreaChart
                data={filteredData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 20,
                }}
            >
                <XAxis
                    dataKey={(d) => d.Timestamp.getTime()}  // Convert Date to timestamp
                    tickFormatter={tickFormatter}
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
                {selectedPowerType === 'All' || selectedPowerType === 'Load Power' ? <Area type="monotone" dataKey="Load Power" stackId="1" stroke="#000" fill="none" strokeWidth={2} /> : null}
                {selectedPowerType === 'All' || selectedPowerType === 'Incomer Power' ? <Area type="monotone" dataKey="Incomer Power" stackId="2" stroke={colors["Incomer Power"]} fill={colors["Incomer Power"]} /> : null}
                {selectedPowerType === 'All' || selectedPowerType === 'Solar Power' ? <Area type="monotone" dataKey="Solar Power" stackId="3" stroke={colors['Solar Power']} fill={colors['Solar Power']} /> : null}
                {showForecast ? <Area type="monotone" dataKey="Expected Power" stackId="4" stroke="#999" fill="#fff" strokeWidth={2} /> : null}
            </AreaChart>
        </ResponsiveContainer>
    );
};
