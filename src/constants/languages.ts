export interface Language {
  type: string;
  name: string;
}

export const SUPPORTED_LANGUAGES: { [key: string]: Language } = {
  EN_US: {
    type: 'en-US',
    name: 'English'
  },
  EX_MX: {
    type: 'es-ES',
    name: 'España'
  },
  JA_JP: {
    type: 'ja-JP',
    name: '日本語'
  },
  KO_KR: {
    type: 'ko-KR',
    name: '한국어'
  },
  RO_MO: {
    type: 'ro-MO',
    name: 'брать'
  },
  ZH_CN: {
    type: 'zh-CN',
    name: '中文'
  }
};

export const LOCALE_LABEL: { [key: string]: string } = {
  'ro-MO': 'брать',
  'en-US': 'English',
  'es-ES': 'Español',
  'ja-JP': '日本語',
  'ko-KR': '한국어',
  'zh-CN': '简体中文'
};
