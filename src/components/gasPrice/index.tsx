import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useGasPrice } from '../../hooks/useGasPrice';
import Modal from '../modal';
import style from './index.module.scss';

export enum GAS_PRICE {
  HIGH,
  MEDIUM,
  LOW
}

export function GasPriceModal({ onOk }: { onOk: (value: number) => void }) {
  const intl = useIntl();
  const gasPrice = useGasPrice();
  const [current, setCurrent] = useState(GAS_PRICE.MEDIUM);
  const handleChange = (e: any) => {
    const { value } = e.target;
    setCurrent(value);
  };
  return (
    <div>
      <div className={style.main}>
        <div className={style.header}>
          <p className={style.header_label}>
            <i className="iconfont icon-gas" />
            {intl.formatMessage({ id: 'currentGAS' })}
          </p>
          <p className={style.header_value}>
            (
            {current == GAS_PRICE.HIGH
              ? intl.formatMessage({ id: 'high' })
              : current == GAS_PRICE.MEDIUM
              ? intl.formatMessage({ id: 'medium' })
              : current == GAS_PRICE.LOW
              ? intl.formatMessage({ id: 'low' })
              : 0}
            )~
            {current == GAS_PRICE.HIGH
              ? (gasPrice * 1.15).toFixed(2)
              : current == GAS_PRICE.MEDIUM
              ? (gasPrice * 1.1).toFixed(2)
              : current == GAS_PRICE.LOW
              ? (gasPrice * 1.05).toFixed(2)
              : 0}
            Gwei
          </p>
        </div>
        <div className={style.tips}>Current base fee is {gasPrice} Gwei</div>
        <div>
          <div className={style.box}>
            <button className={style.item}>
              <div className={style.item_box}>
                <input
                  type="radio"
                  name="gasPrice"
                  value={GAS_PRICE.HIGH}
                  checked={current == GAS_PRICE.HIGH}
                  onChange={handleChange}
                />
                <p className={style.item_box_title}>
                  {intl.formatMessage({ id: 'high' })}
                </p>
                <p className={style.item_box_label}>~ 12 second</p>
              </div>
              <div className={style.item_value}>
                ~ {(gasPrice * 1.15).toFixed(2)} Gwei
              </div>
            </button>
            <button className={style.item}>
              <div className={style.item_box}>
                <input
                  type="radio"
                  name="gasPrice"
                  value={GAS_PRICE.MEDIUM}
                  checked={current == GAS_PRICE.MEDIUM}
                  onChange={handleChange}
                />
                <p className={style.item_box_title}>
                  {intl.formatMessage({ id: 'medium' })}
                </p>
                <p className={style.item_box_label}>~ 30 second</p>
              </div>
              <div className={style.item_value}>
                ~ {(gasPrice * 1.1).toFixed(2)} Gwei
              </div>
            </button>
            <button className={style.item}>
              <div className={style.item_box}>
                <input
                  type="radio"
                  name="gasPrice"
                  value={GAS_PRICE.LOW}
                  checked={current == GAS_PRICE.LOW}
                  onChange={handleChange}
                />
                <p className={style.item_box_title}>
                  {intl.formatMessage({ id: 'low' })}
                </p>
                <p className={style.item_box_label}>≥ 1 min</p>
              </div>
              <div className={style.item_value}>
                ~ {(gasPrice * 1.05).toFixed(2)} Gwei
              </div>
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={style.submit_btn}
        onClick={() => {
          onOk(gasPrice);
        }}
      >
        {intl.formatMessage({ id: 'confirm' })}
      </button>
    </div>
  );
}

export default function GasPrice({
  visible,
  onOk,
  onCancel
}: {
  visible: boolean;
  onOk: (value: number) => void;
  onCancel: () => void;
}) {
  const intl = useIntl();
  return (
    <Modal
      title={intl.formatMessage({ id: 'gasPriceSetting' })}
      visible={visible}
      onCancel={onCancel}
    >
      <GasPriceModal onOk={onOk} />
    </Modal>
  );
}
