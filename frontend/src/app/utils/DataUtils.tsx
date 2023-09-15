import { DataType, TransformedDataType } from "../types/dataTypes";

interface AggregatedDataType {
    'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': number;
    'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': number;
}

/**
 * Transforms the power data to a more manageable format.
 * @param {DataType[]} powerData - The original power data.
 * @returns {TransformedDataType[]} - The transformed power data.
 */
export const transformPowerData = (powerData: DataType[]): TransformedDataType[] => {
    return powerData.map(item => ({
        Timestamp: formatDate(item.Timestamp),
        'Load Power': item['UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD'],
        'Solar Power': item['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR'],
        'Incomer Power': item['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER'],
        'Expected Power': (parseFloat(item['UCT - DSchool - Simulation - Expected power [kW]']) * 1000).toString() // Converted to number, then to Watts, and finally to string
    }));
};

/**
 * Aggregates the total solar and incomer power from the power data.
 * @param {DataType[]} powerData - The original power data.
 * @returns {AggregatedDataType} - The aggregated data.
 */
export const aggregateData = (powerData: DataType[]): AggregatedDataType => {
    let totalSolar = 0;
    let totalIncomerPower = 0;

    powerData.forEach((item) => {
        totalSolar += Number(item['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR']);
        totalIncomerPower += Number(item['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER']);
    });

    return {
        'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': totalSolar,
        'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': totalIncomerPower,
    };
};

/**
 * Formats a date string to a more readable format.
 * @param {string} dateString - The original date string.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatWaterDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    } as const;
    return new Date(date).toLocaleDateString(undefined, options);
}

export const colorMapping = {
    'All': '#FF0000',
    'UCT D-School - Secondary Storey - Kitchen': '#00FF00',
    'UCT D-School - Second Storey - Toilet': '#0000FF',
    'UCT D-School - Second Storey - Ablution': '#009099',
    'UCT D-School - Ground Storey - Toilet': '#FF00FF',
    'UCT D-School - Ground Storey - Hot Ablution': '#00FFFF',
    'UCT D-School - Ground Storey - Geyser': '#800000',
    'UCT D-School - Ground Storey - Cold Ablution': '#008000',
    'UCT D-School - First Storey - Toilet': '#000080',
    'UCT D-School - First Storey - Ablution': '#808000'
  };