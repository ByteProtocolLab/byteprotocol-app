import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { themeStore, ThemeType } from '../../theme';
import Popover from '../popover';
import Switch from '../switch';
import style from './index.module.scss';

export function ThemePopover() {
  const intl = useIntl();
  const [checked, setChecked] = useState(
    themeStore.getState() === ThemeType.DARK
  );

  return (
    <div className={style.wrapper}>
      <div className={style.item}>
        <span className={style.item_title}>
          {checked ? (
            <i className="iconfont icon-moon_stars" />
          ) : (
            <i className="iconfont icon-sun" />
          )}
          {intl.formatMessage({ id: themeStore.getState() })}
        </span>
        <Switch
          checked={checked}
          onChange={(value) => {
            const theme = value ? ThemeType.DARK : ThemeType.LIGHT;
            setChecked(value);
            themeStore.dispatch({
              type: 'changeTheme',
              theme: theme
            });
          }}
        />
      </div>
    </div>
  );
}

export default function Theme({
  visible,
  onCancel,
  onBack
}: {
  visible: boolean;
  onCancel: () => void;
  onBack: () => void;
}) {
  return (
    <Popover visible={visible} onBack={onBack} onCancel={onCancel}>
      <ThemePopover />
    </Popover>
  );
}
