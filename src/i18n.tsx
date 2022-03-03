import React from 'react';
import { connect, Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { languageStore } from './language';
import EN_US from './locales/en_US.json';
import ZH_CN from './locales/zh_CN.json';
import JA_JP from './locales/ja_JP.json';
import KO_KR from './locales/ko_KR.json';
import RO_MO from './locales/ro_MO.json';
import ES_ES from './locales/es_ES.json';

export const getLanguage = (lang: string) => {
  switch (lang) {
    case 'en-US':
      return EN_US;
    case 'zh-CN':
      return ZH_CN;
    case 'ja-JP':
      return JA_JP;
    case 'ko-KR':
      return KO_KR;
    case 'ro-MO':
      return RO_MO;
    case 'es-ES':
      return ES_ES;
    default:
      return EN_US;
  }
};

const mapStateToProps = (state: any) => ({
  key: state,
  locale: state,
  messages: getLanguage(state)
});

export const ConnectIntlProvider = connect(mapStateToProps)(IntlProvider);

export default function LanguageProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={languageStore}>
      <ConnectIntlProvider>{children}</ConnectIntlProvider>
    </Provider>
  );
}
