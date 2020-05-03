import { Preferences } from './types';
import { Option } from 'app/shared/types/global';

export class LoadAppSettings {
  static readonly type = 'LoadAppSettings';
}

export class GetPreferences {
  static readonly type = 'GetPreferences';
  constructor(public preferences: Preferences) {}
}

export class SetLanguage {
  static readonly type = 'SetLanguage';
  constructor(public language: string) {}
}

export class SetTheme {
  static readonly type = 'SetTheme';
  constructor(public scheme: Option[]) {}
}
