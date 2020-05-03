import { LangData } from './types';

export class SetLanguageData {
  static readonly type = 'SetLanguageData';
  constructor(public langData: LangData) {}
}
