import React from 'react';
import { Currency } from '@uniswap/sdk-core';
import Token from '../token';
import style from './index.module.scss';

export default function BaseTokenList({
  currencies,
  onChoose
}: {
  currencies: Currency[];
  onChoose: (currency: Currency) => void;
}) {
  return (
    <div className={style.scroll}>
      <div className={style.wrapper}>
        {currencies.map((item) => (
          <button
            className={style.item}
            key={item.symbol}
            onClick={() => {
              onChoose(item);
            }}
          >
            <div className={style.item_pic}>
              <Token currency={item} />
            </div>
            <p className={style.item_name}>{item.symbol}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
