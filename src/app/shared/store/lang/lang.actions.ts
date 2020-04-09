export class GetLanguage {
  static readonly type = 'GetLanguage';
  constructor(public language: 'en' | 'es') {}
}
