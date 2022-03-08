import React, { useState } from 'react';
import Tokens from '../tokens';
import Input from '../input';
import { Currency } from '@uniswap/sdk-core';
import style from './index.module.scss';
import Token from '../token';

export default function AmountInBox({
  operateLabel,
  balanceLabel,
  chooseLabel,
  value,
  balance,
  currency,
  approve,
  bgVisible,
  onChangeValue,
  onChoose,
  onMax
}: {
  operateLabel: string;
  balanceLabel: string;
  chooseLabel: string;
  value?: string;
  balance?: string;
  currency?: Currency;
  approve: boolean;
  bgVisible?: boolean;
  onChangeValue: (e: any) => void;
  onChoose: (currency: Currency) => void;
  onMax: () => void;
}) {
  const [tokenVisible, setTokenVisible] = useState(false);

  return (
    <div className={`${style.select} ${bgVisible && style.select_bg}`}>
      <div className={style.select_header}>
        <span>{operateLabel}</span>
        <span>
          {balanceLabel}
          {balance ?? '0'}
        </span>
      </div>
      <div className={style.select_content}>
        <Input
          placeholder="0.0"
          pattern="^\d*\.?\d*$"
          value={value}
          className={style.select_content_input}
          onChange={onChangeValue}
        />
        {!currency?.isNative && !approve && (
          <i
            className={[
              `${style.select_content_lock}`,
              `iconfont icon-lock`
            ].join(' ')}
          />
        )}
        <button
          type="button"
          className={style.select_content_btn}
          onClick={onMax}
        >
          Max
        </button>
        <div className={style.select_content_box}>
          <span
            className={style.select_content_box_play}
            onClick={() => {
              setTokenVisible(true);
            }}
          >
            <Token currency={currency} />
            <p className={style.select_content_box_play_token}>
              {currency?.symbol ?? chooseLabel}
            </p>
            <i
              className={[
                `${style.select_content_box_play_btn}`,
                `iconfont icon-down`
              ].join(' ')}
            />
          </span>
        </div>
      </div>
      <Tokens
        visible={tokenVisible}
        onCancel={() => {
          setTokenVisible(false);
        }}
        onChoose={(currency) => {
          onChoose(currency);
          setTokenVisible(false);
        }}
      />
    </div>
  );
}
