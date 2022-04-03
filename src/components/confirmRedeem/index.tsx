import React, { useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { useIntl } from 'react-intl';
import { Percent, Token, CurrencyAmount, Currency } from '@uniswap/sdk-core';
import { useLiquidityTokenPermit } from '../../hooks/useLiquidityTokenPermit';
import { useRemoveLiquidity } from '../../hooks/useRemoveLiquidity';
import { useRemoveLiquidityCallParams } from '../../hooks/useRemoveLiquidityCallParams';
import { useApproveCallback } from '../../hooks/useApproveCallback';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { pairFor } from '../../utils/libarary';
import { ChainId } from '../../connectors/chains';
import { ROUTER_ADDRESS } from '../../constants/address';
import { DEFAULT_CHAIN } from '../../constants/misc';
import TradeSuccess from '../tradeSuccess';
import Confirm from '../confirm';
import Modal from '../modal';
import Alert from '../alert';
import TokenButton from '../token';
import style from './index.module.scss';

export function ConfirmRedeemModal({
  visible,
  slippageLimit,
  currencyA,
  currencyB,
  onOk,
  onCancel,
  onSuccess,
  onError
}: {
  visible: boolean;
  slippageLimit: number;
  currencyA?: Currency;
  currencyB?: Currency;
  onOk: () => void;
  onCancel: () => void;
  onSuccess: (blockHash?: string) => void;
  onError: (error: Error) => void;
}) {
  const intl = useIntl();
  const { chainId } = useActiveWeb3React();

  const pairAddress = useMemo(() => {
    if (!currencyA || !currencyB) return;
    const pairAddress = pairFor(
      currencyA.wrapped.address,
      currencyB.wrapped.address
    );
    return pairAddress;
  }, [currencyA, currencyB]);

  const callParams = useRemoveLiquidityCallParams(currencyA, currencyB);

  const { signature, gatherPermitSignature } = useLiquidityTokenPermit(
    pairAddress,
    BigNumber.from(callParams?.liquidityAmount.numerator.toString() ?? 0)
  );

  const { approve, approveCallback } = useApproveCallback(
    callParams ? callParams.liquidityAmount : undefined,
    ROUTER_ADDRESS[chainId ?? DEFAULT_CHAIN]
  );

  const removeLiquidity = useRemoveLiquidity(
    approve,
    signature,
    new Percent(slippageLimit, 100),
    callParams?.liquidityAmount,
    callParams?.currencyAmountA,
    callParams?.currencyAmountB
  );

  const onAttemptToApprove = async () => {
    if (gatherPermitSignature) {
      try {
        await gatherPermitSignature();
      } catch (error: any) {
        if (error?.code !== 4001) {
          await approveCallback();
        }
      }
    } else {
      await approveCallback();
    }
  };

  const confirm = () => {
    if (removeLiquidity) {
      onOk();
      removeLiquidity()
        .then((res) => {
          console.log(res);
          onSuccess(res.hash);
        })
        .catch((error) => {
          onError(error);
        });
    }
  };

  return (
    <Modal
      title={intl.formatMessage({ id: 'redeemReview' })}
      visible={visible}
      onCancel={onCancel}
    >
      <div>
        <div className={style.main}>
          <div className={style.tokens}>
            <div className={style.token}>
              <TokenButton currency={currencyA} />
            </div>
            <div className={style.token}>
              <TokenButton currency={currencyB} />
            </div>
          </div>
          <span className={style.value}>
            {callParams?.liquidityAmount.toSignificant(6)}
            <i className="iconfont icon-safetycertificate-f" />
          </span>
          <span className={style.title}>
            {`${currencyA?.symbol ?? '--'}/${currencyB?.symbol ?? '--'} LP`}
          </span>
        </div>
        <div className={style.transcation}>
          <div className={style.transcation_item}>
            <p className={style.transcation_item_title}>
              {`${intl.formatMessage({ id: 'redeem' })} ${currencyA?.symbol}`}
            </p>
            <p className={style.transcation_item_value}>
              {callParams?.currencyAmountA.toSignificant(6)}
            </p>
          </div>
          <div className={style.transcation_item}>
            <p className={style.transcation_item_title}>
              {`${intl.formatMessage({ id: 'redeem' })} ${currencyB?.symbol}`}
            </p>
            <p className={style.transcation_item_value}>
              {callParams?.currencyAmountB.toSignificant(6)}
            </p>
          </div>
        </div>
        <p className={style.description}>
          {intl.formatMessage({ id: 'confirmSupplyDescription' })}
        </p>
        {!signature && !approve ? (
          <button
            type="button"
            className={style.sumbit_btn}
            onClick={onAttemptToApprove}
          >
            {intl.formatMessage({ id: 'permissionSignature' })}
          </button>
        ) : (
          <button type="button" className={style.sumbit_btn} onClick={confirm}>
            {intl.formatMessage({ id: 'confirmRedeem' })}
          </button>
        )}
      </div>
    </Modal>
  );
}

export default function ConfirmRedeem({
  visible,
  slippageLimit,
  currencyA,
  currencyB,
  onOk,
  onCancel
}: {
  visible: boolean;
  slippageLimit: number;
  currencyA?: Currency;
  currencyB?: Currency;
  onOk: () => void;
  onCancel: () => void;
}) {
  const intl = useIntl();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [tradeSuccessVisible, setTradeSuccessVisible] = useState(false);
  const [blockHash, setBlockHash] = useState<string>();
  const [error, setError] = useState<Error>();

  return (
    <div>
      <ConfirmRedeemModal
        visible={visible}
        slippageLimit={slippageLimit}
        currencyA={currencyA}
        currencyB={currencyB}
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
        })}  ${currencyA?.symbol} / ${currencyB?.symbol} `}
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
