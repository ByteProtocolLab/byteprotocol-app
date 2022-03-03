import React, { useState } from 'react';
import { Currency } from '@uniswap/sdk-core';
import Tokens from '../tokens';
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
          <div
            className={style.box_select_icon}
            style={{
              backgroundImage: currency?.wrapped.address
                ? `url(https://tokens.1inch.io/${
                    currency?.isNative
                      ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                      : currency?.wrapped.address.toLowerCase()
                  }.png)`
                : undefined
            }}
          />
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
