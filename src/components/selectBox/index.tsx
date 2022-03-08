import React, { useState } from 'react';
import { Currency } from '@uniswap/sdk-core';
import Tokens from '../tokens';
import Token from '../token';
import style from './index.module.scss';

export default function SelectBox({
  chooseLabel,
  currency,
  onChoose
}: {
  chooseLabel: string;
  currency?: Currency;
  onChoose: (currency: Currency) => void;
}) {
  const [tokenVisible, setTokenVisible] = useState(false);

  return (
    <div className={style.select}>
      <div
        className={style.box}
        onClick={() => {
          setTokenVisible(true);
        }}
      >
        <span className={style.box_select}>
          <Token currency={currency} />
          <p className={style.box_select_token}>
            {currency?.symbol ? currency?.symbol : chooseLabel}
          </p>
        </span>
        <i className={[`${style.box_btn}`, `iconfont icon-down`].join(' ')} />
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
