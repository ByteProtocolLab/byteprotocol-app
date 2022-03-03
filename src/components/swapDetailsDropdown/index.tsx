import React, { useState } from 'react';
import { Currency, TradeType, Percent } from '@uniswap/sdk-core';
import { Trade } from '@uniswap/v2-sdk';
import Router from '../../components/router';
import style from './index.module.scss';
import { useIntl } from 'react-intl';

export default function SwapDetailsDropdown({
  trade,
  slippageLimit
}: {
  trade?: Trade<
    Currency,
    Currency,
    TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT
  >;
  slippageLimit: number;
}) {
  const intl = useIntl();
  const [routerVisible, setRouterVisible] = useState(true);
  const [detailVisible, setDetailVisible] = useState(false);
  const [invert, setInvert] = useState(false);

  return (
    <div className={style.wrapper}>
      <div
        className={style.content}
        onClick={() => {
          setDetailVisible(!detailVisible);
        }}
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            setInvert(!invert);
          }}
        >
          {detailVisible || <i className={style.dot} />}
          {invert
            ? `1 ${trade?.outputAmount.currency.symbol} ~ ${
                trade?.executionPrice.invert().toSignificant(6) || 0
              } ${trade?.inputAmount.currency.symbol}`
            : `1 ${trade?.inputAmount.currency.symbol} ~ ${
                trade?.executionPrice.toSignificant(6) || 0
              } ${trade?.outputAmount.currency.symbol}`}
        </span>
        <i className="iconfont icon-down" />
      </div>
      {detailVisible && (
        <div>
          <div className={style.item}>
            <span>
              {intl.formatMessage({ id: 'expectedOutput' })}
              <i
                className={[
                  `${style.item_icon}`,
                  `iconfont icon-question-circle`
                ].join(' ')}
              />
            </span>
            <span>
              {`${trade?.outputAmount.toSignificant(6) || 0} ${
                trade?.outputAmount.currency.symbol
              }`}
              <i className={style.item_dot} />
            </span>
          </div>
          <div className={style.item}>
            <span>{intl.formatMessage({ id: 'priceImpact' })}</span>
            <span className={style.item_box}>
              {trade?.priceImpact.toSignificant(3)}%
            </span>
          </div>
          <div className={style.item}>
            <span>
              {intl.formatMessage({ id: 'minimumReceivedAfterSlippage' })}
            </span>
            <span className={style.setting_item_box}>
              {trade
                ?.minimumAmountOut(
                  new Percent(Math.floor(slippageLimit * 100), 10000)
                )
                .toSignificant(6)}
              {trade?.outputAmount.currency.symbol}
            </span>
          </div>
          <div className={style.item}>
            <span>
              {intl.formatMessage({ id: 'route' })}
              <i
                className={[
                  `${style.item_icon}`,
                  `iconfont icon-question-circle`
                ].join(' ')}
              />
            </span>
            <span className={style.item_box}>
              {trade?.route.path.map((item, index) => {
                return (
                  <span key={index}>
                    {item.symbol}
                    {trade?.route.path.length - 1 > index && (
                      <i className="iconfont icon-right" />
                    )}
                  </span>
                );
              })}
              <i
                className={[
                  `${style.item_icon}`,
                  `iconfont icon-Partition`
                ].join(' ')}
                onClick={() => {
                  setRouterVisible(!routerVisible);
                }}
              />
            </span>
          </div>
          {routerVisible && <Router route={trade?.route} />}
        </div>
      )}
    </div>
  );
}
