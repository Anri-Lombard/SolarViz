import { DataType, TransformedDataType, AggregatedDataType } from "../types/dataTypes";
import { format } from 'date-fns';

export const getTickFormatter = (duration: string) => {
    if (duration === 'day') {
        return (tick: any) => format(new Date(tick), 'HH:mm');
    } else if (duration === 'month') {
        return (tick: any) => format(new Date(tick), 'dd MMM');
    } else if (duration === 'year') {
        return (tick: any) => format(new Date(tick), 'MMM yyyy');
    }
    return (tick: any) => tick;
};

/**
 * Transforms the power data to a more manageable format.
 * @param {DataType[]} powerData        The original power data.
 * @returns {TransformedDataType[]}     The transformed power data.
 */
export const transformPowerData = (powerData: DataType[]): TransformedDataType[] => {
    return powerData.map(item => ({
        Timestamp: formatDate(item.Timestamp),
        'Load Power': item['UCT - DSchool - Basics - UCT - DSchool Load Power [W] - P_LOAD'],
        'Solar Power': item['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR'],
        'Incomer Power': item['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER'],
        'Irradiance': item['UCT - DSchool - Basics - Irradiance on module plane [W/m²] - G_M0'],
        'Expected Power': (parseFloat(item['UCT - DSchool - Simulation - Expected power [kW]']) * 1000).toString() // Converted to number, then to Watts, and finally to string
    }));
};

/**
 * Aggregates the total solar and incomer power from the power data.
 * @param {DataType[]} powerData    The original power data.
 * @returns {AggregatedDataType}    The aggregated data.
 */
export const aggregateData = (powerData: DataType[]): AggregatedDataType => {
    let totalSolar = 0;
    let totalIncomerPower = 0;
    let totalIrradiance = 0;

    powerData.forEach((item) => {
        totalSolar += Number(item['UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR']);
        totalIncomerPower += Number(item['UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER']);
        totalIrradiance += Number(item['UCT - DSchool - Basics - Irradiance on module plane [W/m²] - G_M0']);
    });

    return {
        'UCT - DSchool - Basics - UCT - DSchool Solar [W] - P_SOLAR': totalSolar,
        'UCT - DSchool - Basics - UCT - DSchool Incomer Power [W] - P_INCOMER': totalIncomerPower,
        'UCT - DSchool - Basics - Irradiance on module plane [W/m²] - G_M0': totalIrradiance
    };
};



/**
 * Formats a date string to a more readable format.
 * @param {string} dateString   The original date string.
 * @returns {string}            The formatted date string.
 */
export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Formats a water date string to a short format.
 * @param {string} date     The original water date string.
 * @returns {string}        The formatted water date string.
 */
export const formatWaterDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    } as const;
    return new Date(date).toLocaleDateString(undefined, options);
};

// Mapping of colors for different elements.

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
