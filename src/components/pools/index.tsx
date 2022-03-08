import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import ConfirmRedeem from '../confirmRedeem';
import { Currency } from '@uniswap/sdk-core';
import style from './index.module.scss';
import { ChainId } from '../../connectors/chains';

export default function Pools({
  pairs
}: {
  pairs: { [key: string]: [Currency, Currency] };
}) {
  const intl = useIntl();
  const [reviewVisible, setReviewVisible] = useState(false);
  const [pair, setPair] = useState<[Currency, Currency]>();

  return (
    <div>
      <div className={style.wrapper}>
        {Object.keys(pairs).map((key) => {
          return (
            <div
              className={style.item}
              key={key}
              onClick={() => {
                setPair(pairs[key]);
                setReviewVisible(true);
              }}
            >
              <div className={style.item_header}>
                <div className={style.left}>
                  <div className={style.left_lp}>
                    <div
                      className={style.token}
                      style={{
                        backgroundImage: pairs[key][0].wrapped.address
                          ? `url(https://tokens.1inch.io/${
                              pairs[key][0].isNative &&
                              pairs[key][0].chainId === ChainId.MAINNET
                                ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                                : pairs[key][0].wrapped.address.toLowerCase()
                            }.png)`
                          : undefined
                      }}
                    />
                    <div
                      className={style.token}
                      style={{
                        backgroundImage: pairs[key][1].wrapped.address
                          ? `url(https://tokens.1inch.io/${
                              pairs[key][1].isNative
                                ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                                : pairs[key][1].wrapped.address.toLowerCase()
                            }.png)`
                          : undefined
                      }}
                    />
                  </div>
                  <div className={style.left_symbol}>
                    <span>
                      {pairs[key][0].symbol}/{pairs[key][1].symbol}
                    </span>
                    <p>
                      {pairs[key][0].name}/{pairs[key][1].name}
                    </p>
                  </div>
                </div>
                <div className={style.right}>
                  <p className={style.right_lp}>
                    <span className={style.lp_value}>LP 0 Ξ</span>
                    <button type="button" className={style.right_btn}>
                      {intl.formatMessage({ id: 'redeem' })}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmRedeem
        visible={reviewVisible}
        currencyA={pair?.[0]}
        currencyB={pair?.[1]}
        slippageLimit={1.0}
        onOk={() => {
          setReviewVisible(false);
        }}
        onCancel={() => {
          setReviewVisible(false);
        }}
      />
    </div>
  );
}
