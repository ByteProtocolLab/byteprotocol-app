import React from 'react';
import { Currency } from '@uniswap/sdk-core';
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
              <div
                className={style.item_img}
                style={{
                  backgroundImage: item.wrapped.address
                    ? `url(https://tokens.1inch.io/${
                        item.isNative
                          ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                          : item.wrapped.address.toLowerCase()
                      }.png)`
                    : undefined
                }}
              />
            </div>
            <p className={style.item_name}>{item.symbol}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
