import React, { useState } from 'react';
import { Currency } from '@uniswap/sdk-core';
import { useIntl } from 'react-intl';
import Confirm from '../confirm';
import Modal from '../modal';
import style from './index.module.scss';
import { TransactionResponse } from '@ethersproject/providers';
import TradeSuccess from '../tradeSuccess';

export function ApproveModal({
  visible,
  currency,
  onApprove,
  onCancel
}: {
  visible: boolean;
  currency?: Currency;
  onApprove: () => void;
  onCancel: () => void;
}) {
  const intl = useIntl();
  return (
    <Modal
      title={intl.formatMessage({ id: 'unlock' })}
      visible={visible}
      onCancel={onCancel}
    >
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.box}>
            <div
              className={style.box_icon}
              style={{
                backgroundImage: currency
                  ? `url(https://tokens.1inch.io/${currency?.wrapped.address.toLowerCase()}.png)`
                  : undefined
              }}
            />
            <i
              className={`${style.box_safe} iconfont icon-safetycertificate-f`}
            />
          </div>
          <a
            target="_blank"
            href={`https://etherscan.com/token/${currency?.wrapped.address}`}
            className={style.view}
            rel="noreferrer"
          >
            {currency?.symbol}({currency?.name})-
            {intl.formatMessage({ id: 'viewEtherscan' })}
            <i className="iconfont icon-rotate-right" />
          </a>
          <p className={style.message}>
            <i className="iconfont icon-lock" />
            {intl.formatMessage({ id: 'unlockDescription' })}
          </p>
        </div>
        <button type="button" className={style.btn} onClick={onApprove}>
          {intl.formatMessage({ id: 'confirm' })}
        </button>
      </div>
    </Modal>
  );
}

export default function Approve({
  visible,
  currency,
  onApprove,
  onCancel
}: {
  visible: boolean;
  currency?: Currency;
  onApprove?: () => Promise<TransactionResponse>;
  onCancel: () => void;
}) {
  const intl = useIntl();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [tradeSuccessVisible, setTradeSuccessVisible] = useState(false);
  const [blockHash, setBlockHash] = useState<string>();

  return (
    <div>
      <ApproveModal
        visible={visible}
        currency={currency}
        onApprove={() => {
          setConfirmVisible(true);
          onCancel();
          onApprove &&
            onApprove()
              .then((res) => {
                setConfirmVisible(false);
                setTradeSuccessVisible(true);
                setBlockHash(res.hash);
              })
              .catch(() => {
                setConfirmVisible(false);
              });
        }}
        onCancel={onCancel}
      />
      <Confirm
        visible={confirmVisible}
        message={`Approve ${currency?.symbol}`}
        onCancel={() => {
          setConfirmVisible(false);
        }}
      />
      <TradeSuccess
        visible={tradeSuccessVisible}
        title={'Trade success'}
        message={'SUCCESS'}
        describe={'Your transaction has been successful, we are ready to chain'}
        btnLabel={intl.formatMessage({ id: 'close' })}
        blockHash={blockHash}
        onCancel={() => {
          setTradeSuccessVisible(false);
        }}
      />
    </div>
  );
}
