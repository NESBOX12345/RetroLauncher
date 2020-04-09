import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { environment } from 'environments/environment';
import { SettingsService } from '@services/settings/settings.service';
import { SettingsStateModel } from './types';
import { GetSettings, LoadAppSettings, SetLanguage } from './settings.actions';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    os: environment.os,
    settings: null
  }
})
@Injectable()
export class SettingsState {
  constructor(private settingsService: SettingsService) {}

  @Action(LoadAppSettings)
  loadAppSettings() {
    this.settingsService.loadSettings();
  }

  @Action(GetSettings)
  getSettings(
    { patchState }: StateContext<SettingsStateModel>,
    action: GetSettings
  ) {
    const { settings } = action;
    patchState({
      settings
    });
  }

  @Action(SetLanguage)
  setLanguage(
    { patchState, getState }: StateContext<SettingsStateModel>,
    action: SetLanguage
  ) {
    const { settings } = getState();
    // Reserved word
    const { interface: stateInterface } = settings;

    const { language } = action;

    patchState({
      settings: {
        ...settings,
        interface: {
          ...stateInterface,
          language
        }
      }
    });
  }
}
