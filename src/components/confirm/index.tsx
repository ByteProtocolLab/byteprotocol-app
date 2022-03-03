import React from 'react';
import { useIntl } from 'react-intl';
import Modal from '../modal';
import Loading from '../loading';
import style from './index.module.scss';

export default function Confirm({
  visible,
  message,
  onCancel
}: {
  visible: boolean;
  message: string;
  onCancel: () => void;
}) {
  const intl = useIntl();

  return (
    <Modal
      title={intl.formatMessage({ id: 'waitConfirm' })}
      visible={visible}
      onCancel={onCancel}
    >
      <div className={style.box}>
        <Loading />
        <p className={style.title}>
          {intl.formatMessage({ id: 'confirmWait' })}
        </p>
        <p className={style.info}>{message}</p>
        <p className={style.warn}>
          {intl.formatMessage({ id: 'walletConfirm' })}
        </p>
      </div>
    </Modal>
  );
}
