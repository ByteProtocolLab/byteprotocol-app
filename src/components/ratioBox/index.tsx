import React from 'react';
import Input from '../input';
import { Currency } from '@uniswap/sdk-core';
import style from './index.module.scss';

export default function RatioBox({
  operateLabel,
  rightLabel,
  chooseLabel,
  value,
  currency,
  approve,
  onChangeValue
}: {
  operateLabel: string;
  rightLabel: string;
  chooseLabel: string;
  value: number;
  currency: Currency;
  approve: boolean;
  onChangeValue: (e: any) => void;
}) {
  return (
    <div className={style.select}>
      <div className={style.select_header}>
        <span>{operateLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className={style.select_content}>
        <Input
          placeholder="0.0"
          pattern="^\d*\.?\d*$"
          value={value}
          className={style.select_content_input}
          onChange={onChangeValue}
        />
        {!currency.isNative && !approve && (
          <i
            className={[
              `${style.select_content_lock}`,
              `iconfont icon-lock`
            ].join(' ')}
          />
        )}
        <div className={style.select_content_box}>
          <span className={style.select_content_box_play}>
            <p className={style.select_content_box_play_token}>
              {currency.symbol ? currency.symbol : chooseLabel}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
