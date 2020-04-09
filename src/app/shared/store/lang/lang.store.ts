import { State } from '@ngxs/store';

import { LangStoreModel } from './types';

@State<LangStoreModel>({
  name: 'lang',
  defaults: {
    lang: null,
    menus: []
  }
})
export class LangStore {}
