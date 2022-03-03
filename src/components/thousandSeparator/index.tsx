import React from 'react';
import { useIntl } from 'react-intl';
import Popover from '../popover';
import style from './index.module.scss';

export default function ThousandSeparator({
  visible,
  onCancel,
  onBack
}: {
  visible: boolean;
  onCancel: () => void;
  onBack: () => void;
}) {
  const intl = useIntl();
  return (
    <Popover visible={visible} onBack={onBack} onCancel={onCancel}>
      <div className={style.main}>
        <div className={style.item}>
          <i className="iconfont icon-comma" />
          <div className={style.info}>
            <span className={style.title}>
              {intl.formatMessage({ id: 'comma' })}
            </span>
            <span className={style.label}>(eg:1,000)</span>
          </div>
        </div>
        <div className={style.item}>
          <i className="iconfont icon-space" />
          <div className={style.info}>
            <span className={style.title}>
              {intl.formatMessage({ id: 'space' })}
            </span>
            <span className={style.label}>(eg:1,000)</span>
          </div>
        </div>
        <div className={style.item}>
          <i className="iconfont icon-none" />
          <div className={style.info}>
            <span className={style.title}>None</span>
            <span className={style.label}>(eg:1000)</span>
          </div>
        </div>
      </div>
    </Popover>
  );
}
