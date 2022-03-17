import React from 'react';
import { Currency } from '@uniswap/sdk-core';
import { Route } from '@byteprotocol/sdk';
import style from './index.module.scss';
import { useIntl } from 'react-intl';

export default function Router({
  route
}: {
  route?: Route<Currency, Currency>;
}) {
  const intl = useIntl();
  return (
    <div>
      {route && (
        <div className={style.wrapper}>
          <div className={style.header}>
            <span>
              <i className="iconfont icon-Partition" />
              {intl.formatMessage({ id: 'transactionRouting' })}
            </span>
            <span>V1</span>
          </div>
          <div className={style.main}>
            <div
              className={style.token}
              style={{
                backgroundImage: route.input.wrapped.address
                  ? `url(https://tokens.1inch.io/${
                      route.input.isNative
                        ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                        : route.input.wrapped.address.toLowerCase()
                    }.png)`
                  : undefined
              }}
            />
            <i className={style.bar} />
            {route.pairs.map((item, index) => {
              return (
                <div className={style.pairbox} key={index}>
                  <div className={style.pair}>
                    <div
                      className={style.pair_token}
                      style={{
                        backgroundImage: item.token0
                          ? `url(https://tokens.1inch.io/${item.token0.address.toLowerCase()}.png)`
                          : undefined
                      }}
                    ></div>
                    <div
                      className={style.pair_token}
                      style={{
                        backgroundImage: item.token1
                          ? `url(https://tokens.1inch.io/${item.token1.address.toLowerCase()}.png)`
                          : undefined
                      }}
                    ></div>
                    <p className={style.pair_label}>0.3%</p>
                  </div>
                  <i className={style.bar} />
                </div>
              );
            })}
            <div
              className={style.token}
              style={{
                backgroundImage: route.output.wrapped.address
                  ? `url(https://tokens.1inch.io/${
                      route.output.isNative
                        ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                        : route.output.wrapped.address.toLowerCase()
                    }.png)`
                  : undefined
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
