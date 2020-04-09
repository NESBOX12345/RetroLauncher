export interface SettingsStateModel {
  os: string;
  settings: Settings;
}

export interface Settings {
  account: any;
  interface: Interface;
  cloud: Cloud;
}

export interface Interface {
  language: string;
  theme: Theme;
  start: Start;
}

export class Theme {
  value: string;
  options: Option[];
  colorSchemes: {
    [key: string]: ColorScheme[];
  };
}

export class Option {
  label: string;
  value: string;
  color: string;
  default: boolean;
}

export class ColorScheme {
  label: string;
  key: string;
  value: string;
}

export class Start {
  runOnStart: boolean;
  fullscreen: boolean;
}

export class Cloud {
  syncSettings: boolean;
  syncEmulators: boolean;
  syncSaves: boolean;
  syncRooms: boolean;
}
