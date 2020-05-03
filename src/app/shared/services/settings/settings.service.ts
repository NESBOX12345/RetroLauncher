import { Injectable } from '@angular/core';

import settings from '@store/settings/data/settings';
import { NodeService } from '@services/node/node.service';
import { ElectronService } from '@services/electron/electron.service';
import { Store } from '@ngxs/store';
import { GetPreferences } from '@store/settings/settings.actions';
import { Fs } from '../../types/node';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  fs: Fs;
  path: string;

  private get defaultSettings(): string {
    settings.interface.language = this.clientLanguage;
    return JSON.stringify(settings);
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
      if (!err) {
        this.writeSettingsFile(this.defaultSettings);
      } else {
        // console.error('Error creating settings', err);
        if (err.code === 'EEXIST') {
          this.writeSettingsFile(this.defaultSettings);
        }
      }
    });
  }

  public writeSettingsFile(_settings: string): void {
    this.fs.writeFile(`${this.path}/settings.json`, _settings, err => {
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
          this.store.dispatch(new GetPreferences(JSON.parse(data)));
        }
      }
    );
  }
}
