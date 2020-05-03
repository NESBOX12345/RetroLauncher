import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { LangStateModel } from './types';
import { SetLanguageData } from './lang.actions';

@State<LangStateModel>({
  name: 'lang',
  defaults: null
})
@Injectable()
export class LangState {
  @Selector()
  static menus(state: LangStateModel) {
    return state.menus;
  }

  @Selector()
  static preferences(state: LangStateModel) {
    return state.preferences;
  }

  @Action(SetLanguageData)
  setLanguageData(
    { setState }: StateContext<LangStateModel>,
    action: SetLanguageData
  ) {
    const { langData } = action;
    setState(langData);
  }
}
