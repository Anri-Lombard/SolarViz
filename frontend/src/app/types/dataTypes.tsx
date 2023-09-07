export interface DataType {
    Timestamp: string;
    'UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD': string;
    'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': string;
    'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': string;
}

export interface WaterDataType {
    date: string;
    hour: string;
    'Meter Description': string;
    difference_kl: number;
}

export type GraphSettings = {
    sequence: number;
    duration: number;
    display: boolean;
};

export interface DataDisplayProps {
    powerData: DataType[];
    waterData: WaterDataType[];
    settings: {
        incomerPower: string;
        solarPower: string;
        water: string;
        pieChart: GraphSettings;
        areaChart: GraphSettings;
        lineChart: GraphSettings;
    };
}

export type ConsolidatedData = {
    dateHour: string;
    [key: string]: number | string;
};

export type Settings = {
    incomerPower: string;
    solarPower: string;
    water: string;
    pieChart: GraphSettings;
    areaChart: GraphSettings;
    lineChart: GraphSettings;
};

export interface Admin {
    id: number;
    username: string;
}

export type ColorType = 'incomerPower' | 'solarPower' | 'water';

export type ChartType = 'pieChart' | 'areaChart' | 'lineChart';

export type ColorOptionsProps = {
    type: string,
    colors: string[],
    handleChangeColor: (type: string, color: string) => void,
    currentColor: string
};

export type GraphSettingsProps = {
    chartType: ChartType,
    handleGraphSettingsChange: (chartType: ChartType, field: string, value: number | boolean) => void,
    settings: any // Replace 'any' with the appropriate type
};

export type ManageAdminProps = {
    admins: Admin[],
    removeAdmin: (id: number) => void,
    addAdmin: (username: string, password: string) => void
};