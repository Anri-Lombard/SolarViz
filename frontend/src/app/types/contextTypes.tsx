
// Typescript module for defining data types and props interfaces used in different contexts.

import { DataType, WaterDataType, Settings } from "./dataTypes";

// Props interface for the DataContextProvider component.

export interface DataContextProps {
    powerData: DataType[];
    waterData: WaterDataType[];
}

// Interface representing the authentication context.

export interface AuthContextType {
    isLoggedIn: boolean;        // Indicates whether a user is logged in
    login: () => void;          // Function to perform user login
    logout: () => void;         // Function to perform user logout
}

// Type for the SettingsContext provider.

export type SettingsContextType = {
    settings: Settings;                                // Current user settings
    setSettings: React.Dispatch<React.SetStateAction<Settings>> | ((newSettings: Settings, token: string) => void); // Function to set user settings
};
