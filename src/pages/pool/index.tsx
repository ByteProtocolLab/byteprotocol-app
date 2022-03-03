import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Currency } from '@uniswap/sdk-core';
import ImportPanel from '../../components/importPanel';
import Pools from '../../components/pools';
import style from './index.module.scss';
import { pairFor } from '../../utils/libarary';

export default function Pool() {
  const intl = useIntl();
  const [pairs, setPairs] = useState<{ [key: string]: [Currency, Currency] }>(
    {}
  );

  const importPair = (currencyA?: Currency, currencyB?: Currency) => {
    if (
      currencyA &&
      currencyB &&
      currencyA.wrapped.address !== currencyB.wrapped.address
    ) {
      const pairAddress = pairFor(
        currencyA.wrapped.address,
        currencyB.wrapped.address
      );
      if (!pairs.hasOwnProperty(pairAddress)) {
        const target = { ...pairs };
        target[pairAddress] = [currencyA, currencyB];
        setPairs(target);
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <p className={style.title}>{intl.formatMessage({ id: 'pools' })}</p>
        <div className={style.header}>
          <div
            className={`${style.col} ${style.col_middle_12} ${style.col_small_24}`}
          >
            <div className={style.overview}>
              <span>{intl.formatMessage({ id: 'liquidityRewards' })}</span>
              <label>
                {intl.formatMessage({ id: 'liquidityDescription' })}
              </label>
            </div>
          </div>
          <div
            className={`${style.col} ${style.col_middle_6} ${style.col_small_12}`}
          >
            <div className={style.overview}>
              <span>{intl.formatMessage({ id: 'tradeAmount' })}</span>
              <Link to="/" className={style.overview_btn}>
                VIEW
                <i
                  className={[
                    `${style.overview_btn_icon}`,
                    `iconfont icon-arrowright`
                  ].join(' ')}
                />
              </Link>
            </div>
          </div>
          <div
            className={`${style.col} ${style.col_middle_6} ${style.col_small_12}`}
          >
            <div className={style.overview}>
              <span>{intl.formatMessage({ id: 'lockTotal' })}</span>
              <Link to="/" className={style.overview_btn}>
                VIEW
                <i
                  className={[
                    `${style.overview_btn_icon}`,
                    `iconfont icon-arrowright`
                  ].join(' ')}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className={style.import}>
          <ImportPanel importPair={importPair} />
        </div>
        {Object.keys(pairs).length <= 0 ? (
          <span className={style.hint}>
            <i className="iconfont icon-dropbox" />
            {intl.formatMessage({ id: 'hint' })}
          </span>
        ) : (
          <Pools pairs={pairs} />
        )}
      </div>
    </div>
  );
}
