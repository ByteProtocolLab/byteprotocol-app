import React from 'react';
import { useIntl } from 'react-intl';
import Modal from '../modal';
import style from './index.module.scss';

export default function TradeSuccess({
  visible,
  title,
  btnLabel,
  message,
  describe,
  blockHash,
  onCancel
}: {
  visible: boolean;
  title?: string;
  btnLabel?: string;
  message?: string;
  describe?: string;
  blockHash?: string;
  onCancel: () => void;
}) {
  const intl = useIntl();
  return (
    <Modal title={title} visible={visible} onCancel={onCancel}>
      <div className={style.main}>
        <i className={[`${style.icon}`, 'iconfont icon-arrowup'].join(' ')} />
        <p className={style.message}>{message}</p>
        <p className={style.describe}>{describe}</p>
        <p className={style.blockHash}>
          Ξ:{blockHash}
          <i className="iconfont icon-safetycertificate" />
        </p>
        <a
          className={style.review}
          href={`https://etherscan.com/tx/${blockHash}`}
          target="_blank"
          rel="noreferrer"
        >
          {intl.formatMessage({ id: 'viewEtherscan' })}
          <i className="iconfont icon-code" />
        </a>
      </div>
      <button className={style.btn} onClick={onCancel}>
        {btnLabel}
      </button>
    </Modal>
  );
}
