import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Currency } from '@uniswap/sdk-core';
import ImportPanel from '../../components/importPanel';
import Pools from '../../components/pools';
import Token from '../../components/token';
import { EXTENDS_POOLS } from '../../constants/pools';
import { ChainId } from '../../connectors/chains';
import { pairFor } from '../../utils/libarary';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import style from './index.module.scss';

export default function Pool() {
  const intl = useIntl();
  const { chainId } = useActiveWeb3React();
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
        <div className={style.boxs}>
          <div className={style.boxs_content}>
            {EXTENDS_POOLS[chainId ?? ChainId.BSC].map((item: any, index) => {
              return (
                <Link
                  to={`/supply/${item[0]?.wrapped.address ?? '0x0'}/${
                    item[1]?.wrapped.address ?? '0x0'
                  }`}
                  className={style.box}
                  key={index}
                >
                  <div className={style.header}>
                    <div>
                      <span className={style.header_token}>
                        <Token currency={item[0]} />
                      </span>
                      <span className={style.header_token}>
                        <Token currency={item[1]} />
                      </span>
                    </div>
                  </div>
                  <div className={style.content}>
                    <div className={style.item}>
                      <span className={style.item_title}>Token</span>
                      <span className={style.item_value}>
                        {item[0].symbol}/{item[1].symbol}
                      </span>
                    </div>
                    <div className={style.item}>
                      <span className={style.item_title}>24h Fees</span>
                      <span className={style.item_value}>NEW</span>
                    </div>
                  </div>
                  <div className={style.content}>
                    <div className={style.item}>
                      <span className={style.item_title}>Wallet Balance</span>
                      <span className={style.item_value}>--</span>
                    </div>
                    <div className={style.item}>
                      <span className={style.item_title}>Liquidity</span>
                      <span className={style.item_value}>--</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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
