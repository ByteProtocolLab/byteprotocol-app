import React from 'react';
import { useIntl } from 'react-intl';
import { LOCALE_LABEL } from '../../constants/languages';
import { themeStore, ThemeType } from '../../theme';
import Popover from '../popover';
import style from './index.module.scss';

export function GlobalSettingPopover({
  onOpenTheme,
  onOpenLanguage,
  onOpenSeparator
}: {
  onOpenTheme: () => void;
  onOpenLanguage: () => void;
  onOpenSeparator: () => void;
}) {
  const intl = useIntl();

  return (
    <div className={style.wrapper}>
      <div className={style.item} onClick={onOpenTheme}>
        <div className={style.item_left}>
          <span className={style.item_left_title}>
            {themeStore.getState() === ThemeType.DARK ? (
              <i className="iconfont icon-moon_stars" />
            ) : (
              <i className="iconfont icon-sun" />
            )}
            {intl.formatMessage({ id: themeStore.getState() })}
          </span>
          <span className={style.item_left_label}>
            {intl.formatMessage({ id: 'themeDescription' })}
          </span>
        </div>
        <i className={`${style.item_icon} iconfont icon-right`} />
      </div>
      <div className={style.item} onClick={onOpenLanguage}>
        <div className={style.item_left}>
          <span className={style.item_left_title}>
            <i className="iconfont icon-language" />
            {LOCALE_LABEL[intl.locale]}
          </span>
          <span className={style.item_left_label}>
            {intl.formatMessage({ id: 'languageDescription' })}
          </span>
        </div>
        <i className={`${style.item_icon} iconfont icon-right`} />
      </div>
      <div className={style.item} onClick={onOpenSeparator}>
        <div className={style.item_left}>
          <span className={style.item_left_title}>
            <i className="iconfont icon-none" />
            Space
          </span>
          <span className={style.item_left_label}>
            {intl.formatMessage({ id: 'thousandSeparator' })}
          </span>
        </div>
        <i className={`${style.item_icon} iconfont icon-right`} />
      </div>
    </div>
  );
}

export default function GlobalSetting({
  visible,
  onCancel,
  onOpenTheme,
  onOpenLanguage,
  onOpenSeparator
}: {
  visible: boolean;
  onCancel?: () => void;
  onOpenTheme: () => void;
  onOpenLanguage: () => void;
  onOpenSeparator: () => void;
}) {
  const intl = useIntl();
  return (
    <Popover
      visible={visible}
      title={intl.formatMessage({ id: 'globalSettings' })}
      onCancel={onCancel}
    >
      <GlobalSettingPopover
        onOpenTheme={onOpenTheme}
        onOpenLanguage={onOpenLanguage}
        onOpenSeparator={onOpenSeparator}
      />
    </Popover>
  );
}
