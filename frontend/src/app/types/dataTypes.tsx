
// Interface for the data type representing power-related information.

export interface DataType {
    Timestamp: string;
    'UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD': string;
    'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': string;
    'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': string;
}


// Interface for the data type representing water-related information.

export interface WaterDataType {
    date: string;
    hour: string;
    'Meter Description': string;
    difference_kl: number;
}

// Type for graph settings.

export type GraphSettings = {
    sequence: number;
    duration: number;
    display: boolean;
};

// Type for media settings.

export type MediaSettings = {
    sequence: number;
    display: boolean;
    audio: boolean;
};


// Props interface for the DataDisplay component.

export interface DataDisplayProps {
    powerData: DataType[];
    waterData: WaterDataType[];
    settings: Settings;
}

/**
 * Type for consolidated data.
 */
export type ConsolidatedData = {
    dateHour: string;
    [key: string]: number | string;
};

/**
 * Type for color settings.
 */
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
};


// Type for general application settings.

export type Settings = {
    colors: ColorSettings;
    pieChart: GraphSettings;
    areaChart: GraphSettings;
    lineChart: GraphSettings;
    media: MediaSettings;
};


// Interface for an admin user.

export interface Admin {
    id: number;
    username: string;
}


// Type for color options.

export type ColorType = 'incomerPower' | 'solarPower';


// Type for chart types.

export type ChartType = 'pieChart' | 'areaChart' | 'lineChart';


// Props interface for the ColorOptions component.

export type ColorOptionsProps = {
    type: string;
    colors: string[];
    handleChangeColor: (type: ColorType, color: string) => void;
    currentColor: string;
};

// Props interface for the GraphSettings component.

export type GraphSettingsProps = {
    chartType: ChartType;
    handleGraphSettingsChange: (chartType: ChartType, field: string, value: number | boolean) => void;
    settings: any; // Replace 'any' with the appropriate type
};

// Props interface for the ManageAdmin component.

export type ManageAdminProps = {
    admins: Admin[];
    removeAdmin: (id: number) => void;
    addAdmin: (username: string, password: string) => void;
};

// Props interface for the ChartWrapper component.

export interface ChartWrapperProps {
    title: string;
    chart: React.ReactNode;
    filters?: React.ReactNode;
}

export type PowerType = 'All' | 'Solar' | 'Incomer' | 'Load';
