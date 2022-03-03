import React, { useState } from 'react';
import Language from '../language';
import Theme from '../theme';
import ThousandSeparator from '../thousandSeparator';
import GlobalSetting from './GlobalSetting';
import style from './index.module.scss';

export default function GlobalSettings() {
  const [globalSettingVisible, setGlobalSettingVisible] = useState(false);
  const [themeVisible, setThemeVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);
  const [separatorVisible, setSeparatorVisible] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <i
        className={[`${style.icon} iconfont icon-setting`].join(' ')}
        onClick={() => {
          setGlobalSettingVisible(!globalSettingVisible);
        }}
      />
      <GlobalSetting
        visible={globalSettingVisible}
        onOpenTheme={() => {
          setGlobalSettingVisible(false);
          setThemeVisible(true);
        }}
        onOpenLanguage={() => {
          setGlobalSettingVisible(false);
          setLanguageVisible(true);
        }}
        onOpenSeparator={() => {
          setGlobalSettingVisible(false);
          setSeparatorVisible(true);
        }}
        onCancel={() => {
          setGlobalSettingVisible(false);
        }}
      />
      <Theme
        visible={themeVisible}
        onCancel={() => {
          setThemeVisible(false);
          setGlobalSettingVisible(false);
        }}
        onBack={() => {
          setGlobalSettingVisible(true);
          setThemeVisible(false);
        }}
      />
      <Language
        visible={languageVisible}
        onCancel={() => {
          setLanguageVisible(false);
          setGlobalSettingVisible(false);
        }}
        onBack={() => {
          setGlobalSettingVisible(true);
          setLanguageVisible(false);
        }}
      />
      <ThousandSeparator
        visible={separatorVisible}
        onCancel={() => {
          setSeparatorVisible(false);
          setGlobalSettingVisible(false);
        }}
        onBack={() => {
          setGlobalSettingVisible(true);
          setSeparatorVisible(false);
        }}
      />
    </div>
  );
}
