import { Option } from 'app/shared/types/global';

export interface SettingsStateModel {
  os: string;
  preferences: Preferences;
}

export interface Preferences {
  account: any;
  interface: Interface;
  cloud: Cloud;
}

interface Interface {
  language: string;
  theme: Theme;
  start: Start;
}

export interface Theme {
  value: string;
  options: Option[];
  colorSchemes: {
    [key: string]: Option[];
  };
}
interface Start {
  runOnStart: boolean;
  fullscreen: boolean;
}

interface Cloud {
  syncSettings: boolean;
  syncEmulators: boolean;
  syncSaves: boolean;
  syncRooms: boolean;
}
