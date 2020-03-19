const defaultSettings = {
  language: 'en'
};

export class GetSettings {
  static readonly type = 'GetSettings';
  constructor(public settings: any = defaultSettings) {}
}
