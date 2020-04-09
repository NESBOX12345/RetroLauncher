import { Settings } from './types';

export class LoadAppSettings {
  static readonly type = 'LoadAppSettings';
}

export class GetSettings {
  static readonly type = 'GetSettings';
  constructor(public settings: Settings) {}
}

export class SetLanguage {
  static readonly type = 'SetLanguage';
  constructor(public language: string) {}
}
