import React, { useState } from 'react';
import Tokens from '../tokens';
import Input from '../input';
import { Currency } from '@uniswap/sdk-core';
import style from './index.module.scss';
import { ChainId } from '../../connectors/chains';

export default function AmountInBox({
  operateLabel,
  balanceLabel,
  chooseLabel,
  value,
  balance,
  currency,
  approve,
  bgVisible,
  onChangeValue,
  onChoose,
  onMax
}: {
  operateLabel: string;
  balanceLabel: string;
  chooseLabel: string;
  value?: string;
  balance?: string;
  currency?: Currency;
  approve: boolean;
  bgVisible?: boolean;
  onChangeValue: (e: any) => void;
  onChoose: (currency: Currency) => void;
  onMax: () => void;
}) {
  const [tokenVisible, setTokenVisible] = useState(false);

  return (
    <div className={`${style.select} ${bgVisible && style.select_bg}`}>
      <div className={style.select_header}>
        <span>{operateLabel}</span>
        <span>
          {balanceLabel}
          {balance ?? '0'}
        </span>
      </div>
      <div className={style.select_content}>
        <Input
          placeholder="0.0"
          pattern="^\d*\.?\d*$"
          value={value}
          className={style.select_content_input}
          onChange={onChangeValue}
        />
        {!currency?.isNative && !approve && (
          <i
            className={[
              `${style.select_content_lock}`,
              `iconfont icon-lock`
            ].join(' ')}
          />
        )}
        <button
          type="button"
          className={style.select_content_btn}
          onClick={onMax}
        >
          Max
        </button>
        <div className={style.select_content_box}>
          <span
            className={style.select_content_box_play}
            onClick={() => {
              setTokenVisible(true);
            }}
          >
            <div className={style.select_content_box_play_icon}>
              <span className={style.select_content_box_play_icon_title}>
                {currency?.symbol?.substring(0, 1)}
              </span>
              <i
                className={style.select_content_box_play_icon_picture}
                style={{
                  backgroundImage: currency?.wrapped.address
                    ? `url(https://tokens.1inch.io/${
                        currency?.isNative &&
                        currency.chainId === ChainId.MAINNET
                          ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                          : currency?.wrapped.address.toLowerCase()
                      }.png)`
                    : undefined
                }}
              />
            </div>
            <p className={style.select_content_box_play_token}>
              {currency?.symbol ?? chooseLabel}
            </p>
            <i
              className={[
                `${style.select_content_box_play_btn}`,
                `iconfont icon-down`
              ].join(' ')}
            />
          </span>
        </div>
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
