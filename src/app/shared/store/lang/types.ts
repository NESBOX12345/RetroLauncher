import { Option } from 'app/shared/types/global';

export type LangStateModel = LangData;

export interface LangData {
  preferences: Preferences;
  menus: Menu[];
}

export interface Preferences {
  account: {
    label: string;
  };
  interface: Interface;
  cloud: Cloud;
}

interface Interface {
  label: string;
  language: SettingsSection;
  theme: SettingsSection;
  newTheme: SettingsSection;
  start: SettingsSection;
}

interface Cloud {
  label: string;
  backup: SettingsSection;
}

interface SettingsSection {
  label: string;
  description: string;
  options: Option[];
}

export interface Menu {
  id?: string;
  label: string;
  role?: Role;
  submenu?: Array<SubMenu>;
}

interface SubMenu {
  id?: string;
  label?: string;
  type?: string;
  role?: Role;
  icon?: any;
  visible?: boolean;
  commandId?: number;
  accelerator?: string;
  click?: (event: KeyboardEvent, focusedWebContents?: any) => void;
}

type Role =
  | 'undo'
  | 'redo'
  | 'cut'
  | 'copy'
  | 'paste'
  | 'pasteAndMatchStyle'
  | 'selectAll'
  | 'delete'
  | 'minimize'
  | 'close'
  | 'quit'
  | 'reload'
  | 'forceReload'
  | 'toggleDevTools'
  | 'resetZoom'
  | 'zoomIn'
  | 'zoomOut'
  | 'fileMenu'
  | 'editMenu'
  | 'viewMenu'
  | 'windowMenu'
  | 'appMenu'
  | 'about'
  | 'hide'
  | 'hideOthers'
  | 'unhide'
  | 'startSpeaking'
  | 'stopSpeaking'
  | 'front'
  | 'zoom'
  | 'toggleTabBar'
  | 'selectNextTab'
  | 'selectPreviousTab'
  | 'mergeAllWindows'
  | 'moveTabToNewWindow'
  | 'window'
  | 'help'
  | 'services'
  | 'recentDocuments'
  | 'clearRecentDocuments';
