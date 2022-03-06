import React from 'react';
import { Currency, Fraction } from '@uniswap/sdk-core';
import { useIntl } from 'react-intl';
import style from './index.module.scss';
import { ChainId } from '../../connectors/chains';

export default function TokenList({
  currencies,
  balances,
  priceFeed,
  onChoose
}: {
  currencies: Currency[];
  balances: { [key: string]: Fraction };
  priceFeed: { [key: string]: number };
  onChoose: (currency: Currency) => void;
}) {
  const intl = useIntl();

  return (
    <div className={style.scroll}>
      {currencies.length > 0 ? (
        currencies.map((item, index) => (
          <button
            key={index}
            className={style.item}
            onClick={() => {
              onChoose(item);
            }}
          >
            <div className={style.item_box}>
              <div className={style.item_box_icon}>
                <div
                  className={style.item_box_icon_img}
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
              <div className={style.item_box_info}>
                <p className={style.item_box_info_symbol}>{item.symbol}</p>
                <p className={style.item_box_info_name}>{item.name}</p>
              </div>
            </div>
            <div className={style.item_balance}>
              <p className={style.item_balance_val}>
                {balances[item.wrapped.address]
                  ? balances[item.wrapped.address].toSignificant(6)
                  : 0}
              </p>
              {priceFeed[item.wrapped.address] &&
              balances[item.wrapped.address] ? (
                <span className={style.item_balance_parities}>
                  ~$
                  {priceFeed[item.wrapped.address] *
                    parseFloat(balances[item.wrapped.address].toSignificant(6))}
                  Ξ
                </span>
              ) : (
                <span className={style.item_balance_unknown}>
                  {intl.formatMessage({ id: 'priceUnknown' })}
                  <i className="iconfont icon-error" />
                </span>
              )}
            </div>
          </button>
        ))
      ) : (
        <p className={style.label}>未找到代币</p>
      )}
    </div>
  );
}
