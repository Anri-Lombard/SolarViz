import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { StackedLineChartProps } from '../types/chartTypes';
import { ConsolidatedData } from '../types/dataTypes';
import { formatWaterDate } from '../utils/DataUtils';

// import { useSettings } from '../contexts/SettingsContext';

import { parse, format } from 'date-fns';
/**
 * StackedLineChart displays a stacked line chart using Recharts library.
 *
 * @param {StackedLineChartProps} props     The component's props.
 * @param {ConsolidatedData[]} props.data   Data for the stacked line chart.
 * @returns {JSX.Element}                   The StackedLineChart JSX.
 */


export const StackedLineChart: React.FC<StackedLineChartProps> = ({ data, duration, settings }) => {

    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    function parseCustomDate(dateString: string): Date {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        
        const [day, monthStr, year] = dateString.split(' ');
        const month = monthNames.indexOf(monthStr) + 1;  // +1 because months are 0-indexed in JavaScript
    
        // Convert day and year to numbers
        const dayNumber = parseInt(day, 10);
        const yearNumber = parseInt(year, 10);
    
        return new Date(yearNumber, month - 1, dayNumber);  // months are 0-indexed in JavaScript Date
    }
    
    

    // Convert your date and hour strings to Date objects
    // Convert your data to have Date objects
    // FIXME: fix this
    const convertedData = data.map(item => {
        const dateObj = parseCustomDate(formatWaterDate(item.date));
        const parsedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        const dateHour = new Date(parsedDate + 'T' + item.hour + ':00');
        return {
            ...item,
            dateHour: dateHour,
        };
    });


    // Sort data by dateHour
    convertedData.sort((a, b) => a.dateHour.getTime() - b.dateHour.getTime());

    // Identify the last timestamp
    const lastTimestamp = new Date(convertedData[convertedData.length - 1].dateHour);

    // console.log(lastTimestamp)

    // Filter data based on duration and last timestamp
    const filteredData = convertedData.filter(item => {
        if (duration === 'day') {
            return item.dateHour.getDate() === lastTimestamp.getDate() &&
                item.dateHour.getMonth() === lastTimestamp.getMonth() &&
                item.dateHour.getFullYear() === lastTimestamp.getFullYear();
        } else if (duration === 'month') {
            return item.dateHour.getMonth() === lastTimestamp.getMonth() &&
                item.dateHour.getFullYear() === lastTimestamp.getFullYear();
        } else if (duration === 'year') {
            return item.dateHour.getFullYear() === lastTimestamp.getFullYear();
        }
        return true;
    });

    // Extract unique meter descriptions and date-hour combinations
    const meterDescriptions = Array.from(new Set(data.map(item => item['Meter Description'])));
    const dateHourCombinations = Array.from(new Set(filteredData.map(item => `${item.date} ${item.hour}`)));

    // Consolidate data for the chart
    const consolidatedData: ConsolidatedData[] = dateHourCombinations.map(dateHour => {
        const [date, hour] = dateHour.split(' ');
        const formattedDate = formatWaterDate(date);
        const formattedDateHour = `${formattedDate} ${hour}`;
        const obj: any = { 'dateHour': formattedDateHour };

        // Calculate the sum of usage for each meter description
        meterDescriptions.forEach(desc => {
            const sum = filteredData.filter(item => `${item.date} ${item.hour}` === dateHour && item['Meter Description'] === desc)
                .reduce((acc, curr) => acc + (curr.difference_kl * 1000), 0);
            obj[desc] = sum;
        });
        return obj;
    });

    return (
        <ResponsiveContainer data-testid="stackedLineChart" height={500}>
            <LineChart
                data={consolidatedData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 20,
                }}
            >
                <XAxis
                    dataKey="dateHour"
                    type="category"
                    label={{ value: 'Date and Hour', position: 'bottom' }}
                    tickFormatter={(tickItem) => {
                        if (duration === 'day') {
                            // Extract only the hour part of the dateHour
                            const dateHourParts = tickItem.split(' ');
                            const hourPart = dateHourParts[dateHourParts.length - 1];
                            return hourPart;  // Return only the hour
                        }
                        return tickItem;  // Return the full dateHour otherwise
                    }}
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
