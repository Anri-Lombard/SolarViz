
// Typescript module for defining data types and props interfaces used in different chart components.


import { WaterDataType } from './dataTypes';


// Enumeration of chart types.

export enum ChartTypes {
    PIE = 'PIE',      // Pie chart type
    AREA = 'AREA',    // Stacked area chart type
    LINE = 'LINE',    // Stacked line chart type
    VIDEO = 'VIDEO',  // Video chart type
}


// Props interface for the PieChartComponent.

export interface PieChartComponentProps {
    data: {
        'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': number;
        'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': number;
    };
    colors: {
        incomerPower: string;
        solarPower: string;
    };
}


// Props interface for the StackedAreaChart component.

export interface StackedAreaChartProps {
    data: { Timestamp: string; 'Load Power': string; 'Solar Power': string; 'Incomer Power': string; }[];
    colors: {
        incomerPower: string;
        solarPower: string;
    },
    selectedPowerType: string;
}


// Props interface for the StackedLineChart component.

export interface StackedLineChartProps {
    data: WaterDataType[];
}
