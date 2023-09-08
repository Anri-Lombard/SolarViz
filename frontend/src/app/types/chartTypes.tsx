import { WaterDataType } from './dataTypes';

export enum ChartTypes {
    PIE = 'PIE',
    AREA = 'AREA',
    LINE = 'LINE',
    VIDEO = 'VIDEO',
}

export interface PieChartComponentProps {
    data: {
        'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': number;
        'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': number;
    };
    colors: {
        incomerPower: string;
        solarPower: string;
        water: string;
    };
}

export interface StackedAreaChartProps {
    data: { Timestamp: string; 'Load Power': string; 'Solar Power': string; 'Incomer Power': string; }[];
    colors: {
        incomerPower: string;
        solarPower: string;
        water: string;
    }
}

export interface StackedLineChartProps {
    data: WaterDataType[];
}
