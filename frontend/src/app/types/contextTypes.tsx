import { DataType, WaterDataType, Settings } from "./dataTypes";

export interface DataContextProps {
    powerData: DataType[];
    waterData: WaterDataType[];
}

export interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export type SettingsContextType = {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>> | ((newSettings: Settings, token: string) => void);
};


