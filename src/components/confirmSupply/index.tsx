import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Percent } from '@uniswap/sdk-core';
import Modal from '../modal';
import Confirm from '../confirm';
import Alert from '../alert';
import style from './index.module.scss';
import TradeSuccess from '../tradeSuccess';
import { Liquidity } from '../../hooks/useLiquidity';
import useAddLiquidity from '../../hooks/useAddLiquidity';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';

export function ConfirmSupplyModal({
  visible,
  slippageLimit,
  recipientAddressOrName,
  liquidity,
  onOk,
  onCancel,
  onSuccess,
  onError
}: {
  visible: boolean;
  slippageLimit: number;
  recipientAddressOrName?: string;
  liquidity?: Liquidity;
  onOk: () => void;
  onCancel: () => void;
  onSuccess: (blockHash?: string) => void;
  onError: (error: Error) => void;
}) {
  const intl = useIntl();
  const { account } = useActiveWeb3React();
  const addLiquidity = useAddLiquidity(
    new Percent(Math.floor(slippageLimit * 100), 10000),
    liquidity?.noLiquidity ?? false,
    liquidity?.inputAmount,
    liquidity?.outputAmount,
    recipientAddressOrName
  );
  const confirm = () => {
    onOk();
    if (addLiquidity) {
      addLiquidity()
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
      title={intl.formatMessage({ id: 'supplyReview' })}
      visible={visible}
      onCancel={onCancel}
    >
      <>
        {liquidity && (
          <div>
            <div className={style.main}>
              <div className={style.tokens}>
                <div
                  className={style.token}
                  style={{
                    backgroundImage: `url(https://tokens.1inch.io/${
                      liquidity.inputAmount.currency.isNative
                        ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                        : liquidity.inputAmount.currency.wrapped.address.toLowerCase()
                    }.png)`
                  }}
                />
                <div
                  className={style.token}
                  style={{
                    backgroundImage: `url(https://tokens.1inch.io/${
                      liquidity.outputAmount.currency.isNative
                        ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                        : liquidity.outputAmount.currency.wrapped.address.toLowerCase()
                    }.png)`
                  }}
                />
              </div>
              <span className={style.value}>
                ~ {liquidity.liquidity.toSignificant(6)}
                <i className="iconfont icon-safetycertificate-f" />
              </span>
              <span className={style.title}>
                {`${liquidity?.inputAmount.currency.symbol ?? '--'}/${
                  liquidity?.outputAmount.currency.symbol ?? '--'
                } LP`}
              </span>
            </div>
            <div className={style.transcation}>
              <div className={style.transcation_item}>
                <p className={style.transcation_item_title}>
                  {`${intl.formatMessage({ id: 'deposited' })} ${
                    liquidity.inputAmount.currency.symbol
                  }`}
                </p>
                <p className={style.transcation_item_value}>
                  {liquidity.inputAmount.toSignificant(6)}
                </p>
              </div>
              <div className={style.transcation_item}>
                <p className={style.transcation_item_title}>
                  {`${intl.formatMessage({ id: 'deposited' })} ${
                    liquidity.outputAmount.currency.symbol
                  }`}
                </p>
                <p className={style.transcation_item_value}>
                  {liquidity.outputAmount.toSignificant(6)}
                </p>
              </div>
              <div className={style.transcation_item}>
                <p className={style.transcation_item_title}>
                  {intl.formatMessage({ id: 'shareOfPool' })}
                </p>
                <p className={style.transcation_item_value}>
                  {`${liquidity?.share?.toSignificant(4) ?? '--'} %`}
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
              {intl.formatMessage({ id: 'confirmSupplyDescription' })}
            </p>
            {addLiquidity ? (
              <button
                type="button"
                className={style.sumbit_btn}
                onClick={confirm}
              >
                {intl.formatMessage({ id: 'confirmSupply' })}
              </button>
            ) : (
              <button type="button" className={style.sumbit_disablebtn}>
                {intl.formatMessage({ id: 'confirmSupply' })}
              </button>
            )}
          </div>
        )}
      </>
    </Modal>
  );
}

export default function ConfirmSupply({
  visible,
  slippageLimit,
  recipientAddressOrName,
  liquidity,
  onOk,
  onCancel
}: {
  visible: boolean;
  slippageLimit: number;
  recipientAddressOrName?: string;
  liquidity?: Liquidity;
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
      <ConfirmSupplyModal
        visible={visible}
        slippageLimit={slippageLimit}
        recipientAddressOrName={recipientAddressOrName}
        liquidity={liquidity}
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
          id: 'supply'
        })} ${liquidity?.inputAmount.toSignificant(6)} ${
          liquidity?.inputAmount.currency?.symbol
        } / ${liquidity?.outputAmount.toSignificant(6)} ${
          liquidity?.outputAmount.currency?.symbol
        } ~ ${liquidity?.liquidity.toSignificant(6)} ${
          liquidity?.inputAmount.currency?.symbol
        }/${liquidity?.outputAmount.currency?.symbol}`}
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
