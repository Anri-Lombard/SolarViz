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

export type MediaSettings = {
    sequence: number;
    display: boolean;
    audio: boolean;
}

export interface DataDisplayProps {
    powerData: DataType[];
    waterData: WaterDataType[];
    settings: Settings;
}

export type ConsolidatedData = {
    dateHour: string;
    [key: string]: number | string;
};

export type ColorSettings = {
    incomerPower: string;
    solarPower: string;
    'Secondary Storey Kitchen': string;
    'Second Storey Toilet': string;
    'Second Storey Ablution': string;
    'Ground Storey Toilet': string;
    'Ground Storey Hot Ablution': string;
    'Ground Storey Geyser': string;
    'Ground Storey Cold Ablution': string;
    'First Storey Toilet': string;
    'First Storey Ablution': string;
}

export type Settings = {
    colors: ColorSettings;
    pieChart: GraphSettings;
    areaChart: GraphSettings;
    lineChart: GraphSettings;
    media: MediaSettings;
};

export interface Admin {
    id: number;
    username: string;
}

export type ColorType = 'incomerPower' | 'solarPower';

export type ChartType = 'pieChart' | 'areaChart' | 'lineChart';

export type ColorOptionsProps = {
    type: string,
    colors: string[],
    handleChangeColor: (type: ColorType, color: string) => void,
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

export interface ChartWrapperProps {
    title: string;
    chart: React.ReactNode;
    filters?: React.ReactNode;
}

export type PowerType = 'All' | 'Solar' | 'Incomer' | 'Load';