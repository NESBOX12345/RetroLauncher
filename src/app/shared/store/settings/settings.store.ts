import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { environment } from 'environments/environment';
import { SettingsService } from '@services/settings/settings.service';
import { SettingsStateModel } from './types';
import {
  GetPreferences,
  LoadAppSettings,
  SetLanguage,
  SetTheme
} from './settings.actions';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    os: environment.os,
    preferences: null
  }
})
@Injectable()
export class SettingsState {
  constructor(private settingsService: SettingsService) {}

  @Selector()
  static preferences(state: SettingsStateModel) {
    return state.preferences;
  }

  @Selector()
  static language(state: SettingsStateModel) {
    return state.preferences.interface.language;
  }

  @Selector()
  static theme(state: SettingsStateModel) {
    return state.preferences.interface.theme;
  }

  @Action(LoadAppSettings)
  loadAppSettings() {
    this.settingsService.loadSettings();
  }

  @Action(GetPreferences)
  getPreferences(
    { patchState }: StateContext<SettingsStateModel>,
    action: GetPreferences
  ) {
    const { preferences } = action;
    patchState({
      preferences
    });
  }

  @Action(SetLanguage)
  setLanguage(
    { patchState, getState }: StateContext<SettingsStateModel>,
    action: SetLanguage
  ) {
    const { preferences } = getState();
    // Reserved word
    const { interface: stateInterface } = preferences;

    const { language } = action;

    patchState({
      preferences: {
        ...preferences,
        interface: {
          ...stateInterface,
          language
        }
      }
    });
  }

  @Action(SetTheme)
  setTheme(ctx: StateContext<SettingsStateModel>, action: SetTheme) {
    const { scheme } = action;
    scheme.forEach(s =>
      document.documentElement.style.setProperty(s.id, s.value)
    );
  }
}
