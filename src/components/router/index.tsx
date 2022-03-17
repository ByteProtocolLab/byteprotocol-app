import React from 'react';
import { Currency } from '@uniswap/sdk-core';
import { Route } from '@byteprotocol/sdk';
import style from './index.module.scss';
import { useIntl } from 'react-intl';
import Token from '../token';

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
            <Token currency={route.input} />
            <i className={style.bar} />
            {route.pairs.map((item, index) => {
              return (
                <div className={style.pairbox} key={index}>
                  <div className={style.pair}>
                    <div className={style.pair_token}>
                      <Token currency={item.token0} />
                    </div>
                    <div className={style.pair_token}>
                      <Token currency={item.token1} />
                    </div>
                    <p className={style.pair_label}>0.3%</p>
                  </div>
                  <i className={style.bar} />
                </div>
              );
            })}
            <Token currency={route.output} />
          </div>
        </div>
      )}
    </div>
  );
}
