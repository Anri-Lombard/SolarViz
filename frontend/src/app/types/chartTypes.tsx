
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
        'UCT - DSchool - Basics - Irradiance on module plane [W/m²] - G_M0': number;
    };
    colors: {
        "Incomer Power": string;
        "Solar Power": string;
    };
    showIrradiance: boolean;
}


// Props interface for the StackedAreaChart component.

export interface StackedAreaChartProps {
    data: { Timestamp: string; 'Load Power': string; 'Solar Power': string; 'Incomer Power': string; 'Expected Power': string; }[];
    colors: {
        "Incomer Power": string;
        "Solar Power": string;
    },
    selectedPowerType: string;
    showForecast: boolean;
    duration: string;
}


// Props interface for the StackedLineChart component.

export interface StackedLineChartProps {
    duration: string;
    data: WaterDataType[];
}
