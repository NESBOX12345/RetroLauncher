import { Menu } from '../../types/menu';

export interface LangStoreModel {
  lang: 'en' | 'es,';
  menus: Menu[];
}
