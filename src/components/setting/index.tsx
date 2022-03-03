import React from 'react';
import { useIntl } from 'react-intl';
import Modal from '../modal';
import Switch from '../switch';
import style from './index.module.scss';

export function SettingModal({
  addressVisible,
  openSlippageLimit,
  openGasPrice,
  openAddress
}: {
  addressVisible: boolean;
  openSlippageLimit: () => void;
  openGasPrice: () => void;
  openAddress: (value: boolean) => void;
}) {
  const intl = useIntl();
  return (
    <div>
      <div className={style.item}>
        <p>
          <i className="iconfont  icon-adduser" />
          {intl.formatMessage({ id: 'payeeSetting' })}
        </p>
        <Switch checked={addressVisible} onChange={openAddress} />
      </div>
      <div className={style.item}>
        <p>
          <i className="iconfont icon-fall" />
          {intl.formatMessage({ id: 'slippagePriceSetting' })}
        </p>
        <i
          aria-hidden
          className="iconfont icon-right"
          onClick={openSlippageLimit}
        />
      </div>
      <div className={style.item}>
        <p>
          <i className="iconfont icon-gas" />
          {intl.formatMessage({ id: 'gasPriceSetting' })}
        </p>
        <i className="iconfont icon-right" onClick={openGasPrice} />
      </div>
    </div>
  );
}

export default function Setting({
  visible,
  addressVisible,
  openSlippageLimit,
  openGasPrice,
  openAddress,
  onCancel
}: {
  visible: boolean;
  addressVisible: boolean;
  openSlippageLimit: () => void;
  openGasPrice: () => void;
  openAddress: (value: boolean) => void;
  onCancel: () => void;
}) {
  const intl = useIntl();
  return (
    <Modal
      title={intl.formatMessage({ id: 'advancedSettings' })}
      visible={visible}
      onCancel={onCancel}
    >
      <SettingModal
        addressVisible={addressVisible}
        openSlippageLimit={openSlippageLimit}
        openGasPrice={openGasPrice}
        openAddress={openAddress}
      />
    </Modal>
  );
}
