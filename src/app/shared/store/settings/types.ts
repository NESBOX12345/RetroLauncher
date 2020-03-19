export interface SettingsStateModel {
  language: 'en' | 'es';
  lang: Lang;
}

export interface Lang {
  title: string;
  welcome: string;
}
