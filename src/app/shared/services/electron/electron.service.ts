import { Injectable } from '@angular/core';

import { Electron, Remote } from '../../types/electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private get require(): boolean {
    return window && window.require ? true : false;
  }

  private get electron(): Electron {
    let electron = null;
    if (this.require) {
      electron = window.require('electron');
    }
    return electron;
  }

  public get isElectronApp(): boolean {
    return !!window.navigator.userAgent.match(/Electron/);
  }

  public get isMacOS(): boolean {
    return process.platform === 'darwin' ? true : false;
  }

  public get isWindows(): boolean {
    return process.platform === 'win32' ? true : false;
  }

  public get isLinux(): boolean {
    return process.platform === 'linux' ? true : false;
  }

  public get remote(): Remote {
    return this.electron.remote;
  }

  constructor() {
    if (!this.require) {
      console.error('REQUIRE NOT FOUND ON WINDOW OBJECT');
    }
  }
}
