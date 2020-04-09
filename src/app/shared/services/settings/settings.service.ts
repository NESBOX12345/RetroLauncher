import { Injectable } from '@angular/core';

import * as en from '../../store/lang/en.json';
import * as es from '../../store/lang/es.json';
import * as defaultSettings from '../../store/settings/settings.json';
import { Fs } from '../../types/node';
import { NodeService } from '../node/node.service';
import { ElectronService } from '../electron/electron.service';
import { Store } from '@ngxs/store';
import { GetSettings } from '../../store/settings/settings.actions';
import { Settings } from '../../store/settings/types';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  fs: Fs;
  path: string;

  private get defaultSettings(): Settings {
    return (defaultSettings as any).default;
  }

  public get clientLanguage(): string {
    switch (true) {
      case /^en/.test(navigator.language):
        return 'en';
      case /^es/.test(navigator.language):
        return 'es';
      default:
        return 'en';
    }
  }

  constructor(
    private store: Store,
    private nodeService: NodeService,
    private electronService: ElectronService
  ) {
    this.fs = this.nodeService.fs;
  }

  public loadSettings(): void {
    if (this.electronService.isElectronApp) {
      if (this.electronService.isMacOS) {
        this.path = `${process.env.HOME}/Documents/RetroLauncher`;
      }
      this.getAppSettings();
    }
  }

  private getAppSettings(): void {
    this.fs.access(`${this.path}/settings.json`, err => {
      if (err) {
        if (err.code === 'ENOENT') {
          this.createSettingsFolder();
        }
      } else {
        // File Exist
        this.readSettings();
      }
    });
  }

  private createSettingsFolder(): void {
    this.fs.mkdir(this.path, err => {
      // Get Default Settings
      this.defaultSettings.interface.language = this.clientLanguage;
      const settings = JSON.stringify(this.defaultSettings);
      if (!err) {
        this.writeSettingsFile(settings);
      } else {
        // console.error('Error creating settings', err);
        if (err.code === 'EEXIST') {
          this.writeSettingsFile(settings);
        }
      }
    });
  }

  public writeSettingsFile(settings: string): void {
    this.fs.writeFile(`${this.path}/settings.json`, settings, err => {
      if (err) {
        console.log('Error writing on settings', err);
      } else {
        this.readSettings();
      }
    });
  }

  private readSettings(): void {
    this.fs.readFile(
      `${this.path}/settings.json`,
      'utf8',
      (err, data: string) => {
        if (err) {
          console.log('ERROR: ', err);
        } else {
          this.store.dispatch(new GetSettings(JSON.parse(data)));
        }
      }
    );
  }
}
