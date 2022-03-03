import React from 'react';
import Modal from '../modal';
import style from './index.module.scss';

export default function Alert({
  visible,
  title,
  btnLabel,
  describe,
  message,
  onCancel
}: {
  visible: boolean;
  title?: string;
  btnLabel?: string;
  message?: string;
  describe?: string;
  onCancel: () => void;
}) {
  return (
    <Modal title={title} visible={visible} onCancel={onCancel}>
      <div className={style.main}>
        <i className={[`${style.icon}`, 'iconfont icon-error'].join(' ')} />
        <p className={style.message}>{message}</p>
        <p className={style.describe}>{describe}</p>
      </div>
      <button className={style.btn} onClick={onCancel}>
        {btnLabel}
      </button>
    </Modal>
  );
}
