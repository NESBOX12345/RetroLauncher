import { State, Action, StateContext, Selector, Select } from '@ngxs/store';

import { SettingsStateModel, Lang } from './types';
import { GetSettings } from './settings.actions';

import * as langEn from './lang/lang-en.json';
import * as langEs from './lang/lang-es.json';
import { Injectable } from '@angular/core';

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    language: null,
    lang: {
      title: null,
      welcome: null
    }
  }
})
@Injectable()
export class SettingsState {
  // Get language strings
  @Selector()
  static lang(state: SettingsStateModel): Lang {
    return state.lang;
  }

  @Action(GetSettings)
  getSettings(
    { patchState }: StateContext<SettingsStateModel>,
    action: GetSettings
  ) {
    const { language } = action.settings;
    let lang;

    switch (language) {
      case 'es':
        lang = langEs;
        break;
      default:
        lang = langEn;
    }
    patchState({
      language,
      lang: { ...lang.default }
    });
  }
}
