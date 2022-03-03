import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useSwapCallback from '../../hooks/useSwapCallback';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { Trade } from '@uniswap/v2-sdk';
import { Currency, TradeType, Percent } from '@uniswap/sdk-core';
import Modal from '../modal';
import Confirm from '../confirm';
import Alert from '../alert';
import style from './index.module.scss';
import TradeSuccess from '../tradeSuccess';

export function ConfirmSwapModal({
  visible,
  slippageLimit,
  recipientAddressOrName,
  trade,
  onOk,
  onCancel,
  onSuccess,
  onError
}: {
  visible: boolean;
  slippageLimit: number;
  recipientAddressOrName?: string;
  trade?: Trade<Currency, Currency, TradeType>;
  onOk: () => void;
  onCancel: () => void;
  onSuccess: (blockHash?: string) => void;
  onError: (error: Error) => void;
}) {
  const intl = useIntl();
  const { account } = useActiveWeb3React();
  const allowedSlippage = new Percent(Math.floor(slippageLimit * 100), 10000);
  const { callback } = useSwapCallback(
    allowedSlippage,
    trade,
    recipientAddressOrName
  );

  const confirm = () => {
    onOk();
    if (callback) {
      callback()
        .then((res) => {
          onSuccess(res.hash);
        })
        .catch((error) => {
          onError(error);
        });
    }
  };

  return (
    <Modal
      title={intl.formatMessage({ id: 'tradingPreview' })}
      visible={visible}
      onCancel={onCancel}
    >
      <div>
        {trade && (
          <div>
            <div className={style.main}>
              <div className={`${style.main_item} ${style.main_item_left}`}>
                <div className={style.main_item_header}>
                  <p>{intl.formatMessage({ id: 'sell' })}</p>
                </div>
                <p className={style.main_item_value}>
                  {trade.inputAmount.toSignificant(6)}
                </p>
                <span className={style.main_item_symbol}>
                  {trade.inputAmount.currency.symbol}
                </span>
              </div>
              <div className={style.arrow}>
                <i className="iconfont icon-arrowright"></i>
              </div>
              <div className={`${style.main_item} ${style.main_item_right}`}>
                <div className={style.main_item_header}>
                  <p>{intl.formatMessage({ id: 'buy' })}</p>
                  <p>
                    {intl.formatMessage({ id: 'receiveLeast' })} ~ {''}
                    {trade?.minimumAmountOut(allowedSlippage).toSignificant(6)}
                    <i className="iconfont icon-safetycertificate-f" />
                  </p>
                </div>
                <p className={style.main_item_value}>
                  {trade.outputAmount.toSignificant(6)}
                </p>
                <span className={style.main_item_symbol}>
                  {trade.outputAmount.currency.symbol}
                </span>
              </div>
            </div>
            <div className={style.transcation}>
              <div className={style.transcation_item}>
                <p className={style.transcation_item_title}>
                  {intl.formatMessage({ id: 'expectedOutput' })}
                </p>
                <p className={style.transcation_item_value}>
                  {`${trade.outputAmount.toSignificant(6)} ${
                    trade.outputAmount.currency.symbol
                  }`}
                  <i className={style.transcation_item_dot} />
                </p>
              </div>
              <div className={style.transcation_item}>
                <p className={style.transcation_item_title}>
                  {intl.formatMessage({ id: 'priceImpact' })}
                </p>
                <p className={style.transcation_item_value}>
                  {trade?.priceImpact.toSignificant(3)}%
                </p>
              </div>
              <div className={style.transcation_item}>
                <p className={style.transcation_item_title}>
                  {intl.formatMessage({ id: 'route' })}
                </p>
                <p className={style.transcation_item_value}>
                  {trade.route.path.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.symbol}
                        {trade.route.path.length - 1 > index && (
                          <i className="iconfont icon-right" />
                        )}
                      </span>
                    );
                  })}
                </p>
              </div>
              <div className={style.transcation_item}>
                <p className={style.transcation_item_title}>
                  {intl.formatMessage({ id: 'recipient' })}
                </p>
                <p className={style.transcation_item_value}>
                  {recipientAddressOrName ?? account ?? ''}
                </p>
              </div>
            </div>
            <p className={style.description}>
              {intl
                .formatMessage({ id: 'swapTips' })
                .replace(
                  '%s',
                  `${trade
                    ?.minimumAmountOut(allowedSlippage)
                    .toSignificant(6)} ${trade.outputAmount.currency.symbol}`
                )}
            </p>
            {callback ? (
              <button
                type="button"
                className={style.sumbit_btn}
                onClick={confirm}
              >
                {intl.formatMessage({ id: 'confirmSwap' })}
              </button>
            ) : (
              <button type="button" className={style.sumbit_disablebtn}>
                {intl.formatMessage({ id: 'confirmSwap' })}
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default function ConfirmSwap({
  visible,
  trade,
  slippageLimit,
  recipientAddressOrName,
  onOk,
  onCancel
}: {
  visible: boolean;
  trade?: Trade<Currency, Currency, TradeType>;
  slippageLimit: number;
  recipientAddressOrName?: string;
  onOk: () => void;
  onCancel: () => void;
}) {
  const intl = useIntl();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [tradeSuccessVisible, setTradeSuccessVisible] = useState(false);
  const [error, setError] = useState<Error>();
  const [blockHash, setBlockHash] = useState<string>();

  return (
    <div>
      <ConfirmSwapModal
        visible={visible}
        trade={trade}
        slippageLimit={slippageLimit}
        recipientAddressOrName={recipientAddressOrName}
        onOk={() => {
          setConfirmVisible(true);
          onOk();
        }}
        onCancel={onCancel}
        onSuccess={(blockHash) => {
          setConfirmVisible(false);
          setTradeSuccessVisible(true);
          setBlockHash(blockHash);
        }}
        onError={(error) => {
          setConfirmVisible(false);
          setAlertVisible(true);
          setError(error);
        }}
      />
      <Confirm
        visible={confirmVisible}
        message={`${intl.formatMessage({
          id: 'take'
        })} ${trade?.inputAmount.toSignificant(6)} ${
          trade?.inputAmount.currency?.symbol
        } ${intl.formatMessage({
          id: 'exchangeFor'
        })} ${trade?.outputAmount.toSignificant(6)} ${
          trade?.outputAmount.currency?.symbol
        }`}
        onCancel={() => {
          setConfirmVisible(false);
        }}
      />
      <Alert
        visible={alertVisible}
        title={intl.formatMessage({ id: 'errorTips' })}
        message={intl.formatMessage({ id: 'errorTips' })}
        describe={error?.message}
        btnLabel={intl.formatMessage({ id: 'close' })}
        onCancel={() => {
          setAlertVisible(false);
        }}
      />
      <TradeSuccess
        visible={tradeSuccessVisible}
        title={'Trade success'}
        message={'SUCCESS'}
        describe={'Your transaction has been submit, we are ready to chain'}
        btnLabel={intl.formatMessage({ id: 'close' })}
        blockHash={blockHash}
        onCancel={() => {
          setTradeSuccessVisible(false);
        }}
      />
    </div>
  );
}
