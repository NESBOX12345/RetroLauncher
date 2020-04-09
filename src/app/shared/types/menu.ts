export interface Menu {
  id?: string;
  label: string;
  role?: Role;
  submenu?: Array<SubMenu>;
  click?: (event: KeyboardEvent, focusedWebContents?: any) => void;
}

export interface SubMenu {
  id?: string;
  label?: string;
  type?: string;
  role?: Role;
  icon?: any;
  visible?: boolean;
  commandId?: number;
}

export type Role =
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
