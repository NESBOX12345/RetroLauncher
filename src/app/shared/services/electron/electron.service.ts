import { Injectable, OnDestroy } from '@angular/core';

import { Electron, Remote } from '../../types/electron';
import { Menu } from '@store/lang/types';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectronService implements OnDestroy {
  public backgroundColor$: BehaviorSubject<string> = new BehaviorSubject(null);
  private background: string;
  private windows = {};
  private destroy$ = new Subject();

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
    // Get theme background color
    this.backgroundColor$
      .pipe(takeUntil(this.destroy$))
      .subscribe(background => {
        if (background) {
          this.background = background;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setAppMenus(menus: Menu[]): void {
    const ms = this.remote.Menu.buildFromTemplate(menus);
    this.remote.Menu.setApplicationMenu(ms);
  }

  public createWindow(id: string, title: string): void {
    if (this.windows[id]) {
      this.windows[id].focus();
      this.windows[id].show();
    } else {
      const win = new this.remote.BrowserWindow({
        title,
        width: 800,
        height: 600,
        show: false,
        backgroundColor: this.background,
        webPreferences: { nodeIntegration: true }
      });
      win.loadURL(`file://${__dirname}/index.html#/${id}`);
      win.once('ready-to-show', () => {
        win.show();
      });
      win.on('close', e => {
        delete this.windows[id];
      });

      this.windows[id] = win;
    }
  }
}
