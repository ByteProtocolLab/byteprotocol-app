import React from 'react';
import { Currency } from '@uniswap/sdk-core';
import style from './index.module.scss';
import { ChainId } from '../../connectors/chains';

export default function Token({ currency }: { currency?: Currency }) {
  return (
    <div className={style.icon}>
      <span className={style.icon_title}>
        {currency?.symbol?.substring(0, 1)}
      </span>
      <i
        className={style.icon_picture}
        style={{
          backgroundImage: currency?.wrapped.address
            ? `url(https://tokens.1inch.io/${
                currency?.isNative && currency.chainId === ChainId.MAINNET
                  ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                  : currency?.wrapped.address.toLowerCase()
              }.png)`
            : undefined
        }}
      />
    </div>
  );
}
