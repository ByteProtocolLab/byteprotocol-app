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
                currency?.isNative
                  ? currency.chainId === ChainId.MAINNET
                    ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                    : currency.chainId === ChainId.POLYGON ||
                      currency.chainId === ChainId.POLYGON_MUMBAI
                    ? '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'
                    : currency.chainId === ChainId.BSC
                    ? '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1'
                    : ''
                  : currency?.wrapped.address.toLowerCase()
              }.png)`
            : undefined
        }}
      />
    </div>
  );
}
