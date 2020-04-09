export interface Electron {
  clipboard: any;
  nativeImage: any;
  shell: any;
  contextBridge: any;
  crashReporter: any;
  ipcRenderer: any;
  webFrame: any;
  desktopCapturer: any;
  remote: Remote;
}

export interface Remote {
  Menu: any;
  getCurrentWindow: () => void;
}
