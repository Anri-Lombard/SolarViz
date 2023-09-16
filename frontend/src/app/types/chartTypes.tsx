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
        'UCT - DSchool - Basics - Irradiance on module plane [W/m²] - G_M0': number;
    };
    colors: {
        incomerPower: string;
        solarPower: string;
    };
    showIrradiance: boolean;
}

export interface StackedAreaChartProps {
    data: { Timestamp: string; 'Load Power': string; 'Solar Power': string; 'Incomer Power': string; 'Expected Power': string; }[];
    colors: {
        incomerPower: string;
        solarPower: string;
    },
    selectedPowerType: string;
    showForecast: boolean;
}

export interface StackedLineChartProps {
    data: WaterDataType[];
}
