import React from 'react';
import { useIntl } from 'react-intl';
import Popover from '../popover';
import style from './index.module.scss';

export default function Help({
  visible,
  onCancel
}: {
  visible: boolean;
  onCancel: () => void;
}) {
  const intl = useIntl();

  return (
    <Popover
      title={intl.formatMessage({ id: 'helpDescription' })}
      visible={visible}
      onCancel={onCancel}
    >
      <div className={style.main}>
        <a
          className={style.item}
          href="https://github.com/ByteProtocolLab"
          target="_blank"
          rel="noreferrer"
        >
          <i className="iconfont icon-github-fill" />
          <div className={style.info}>
            <span className={style.title}>Github</span>
            <span className={style.label}>
              {intl.formatMessage({ id: 'githubDescribe' })}
            </span>
          </div>
        </a>
        <div className={style.item}>
          <i className="iconfont icon-discord" />
          <div className={style.info}>
            <span className={style.title}>Join Discord</span>
            <span className={style.label}>
              {intl.formatMessage({ id: 'discordDescribe' })}
            </span>
          </div>
        </div>
        <a
          className={style.item}
          href="https://github.com/ByteProtocolLab"
          target="_blank"
          rel="noreferrer"
        >
          <i className="iconfont icon-question-circle" />
          <div className={style.info}>
            <span className={style.title}>Help Center</span>
            <span className={style.label}>
              {intl.formatMessage({ id: 'helpCenterDescribe' })}
            </span>
          </div>
        </a>
        <div className={style.item}>
          <i className="iconfont icon-bug" />
          <a
            className={style.info}
            href="mailto:test@jsphp.net?subject=bug&cc=byteprotocol@gmail.com"
          >
            <span className={style.title}>Provide Feedback</span>
            <span className={style.label}>
              {intl.formatMessage({ id: 'bugFeedbackDescribe' })}
            </span>
          </a>
        </div>
      </div>
    </Popover>
  );
}
