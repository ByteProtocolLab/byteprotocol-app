import React from 'react';
import { Currency } from '@uniswap/sdk-core';
import style from './index.module.scss';
import { ChainId } from '../../connectors/chains';

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
              <div className={style.item_img}>
                <span className={style.item_img_title}>
                  {item.symbol?.substring(0, 1)}
                </span>
                <i
                  className={style.item_img_picture}
                  style={{
                    backgroundImage: item.wrapped.address
                      ? `url(https://tokens.1inch.io/${
                          item.isNative && item.chainId === ChainId.MAINNET
                            ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                            : item.wrapped.address.toLowerCase()
                        }.png)`
                      : undefined
                  }}
                />
              </div>
            </div>
            <p className={style.item_name}>{item.symbol}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
