import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useCurrencyBalance } from '../../hooks/useCurrencyBalance';
import { useBestTrade } from '../../hooks/useBestTrade';
import { TradeType, Currency, CurrencyAmount } from '@uniswap/sdk-core';
import Setting from '../../components/setting';
import ConfirmSwap from '../../components/confirmSwap';
import SlippageLimit from '../../components/slippageLimit';
import Input from '../../components/input';
import Approve from '../../components/approve';
import AmountInBox from '../../components/amountInBox';
import GasPrice from '../../components/gasPrice';
import TabFooter from '../../components/tabFooter';
import SwapDetailsDropdown from '../../components/swapDetailsDropdown';
import { useApproveCallback } from '../../hooks/useApproveCallback';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { ROUTER_ADDRESS } from '../../constants/address';
import { useWrappedCallback } from '../../hooks/useWrappedCallback';
import { parseCurrencyAmount } from '../../utils/parse';
import style from './index.module.scss';
import { DEFAULT_CHAIN } from '../../constants/misc';
import { useSearch } from '../../hooks/useSearch';

const SwapButton = ({
  intl,
  active,
  account,
  inputCurrency,
  outputCurrency,
  inputValue,
  inputBalance,
  approve,
  allowSwap,
  setReviewVisible,
  setApproveVisible,
  onWrappedCallback
}: {
  intl: any;
  active: boolean;
  account?: string;
  inputCurrency?: Currency;
  outputCurrency?: Currency;
  inputValue?: CurrencyAmount<Currency>;
  inputBalance?: CurrencyAmount<Currency>;
  approve: boolean;
  allowSwap: boolean;
  setReviewVisible: (visible: boolean) => void;
  setApproveVisible: (visible: boolean) => void;
  onWrappedCallback?: () => void;
}) => {
  if (account && active) {
    if (inputCurrency?.wrapped.address && outputCurrency?.wrapped.address) {
      if (inputCurrency?.wrapped.address === outputCurrency?.wrapped.address) {
        if (onWrappedCallback) {
          return (
            <button
              type="button"
              className={style.sumbit_btn}
              onClick={onWrappedCallback}
            >
              {intl.formatMessage({ id: 'swap' })}
            </button>
          );
        } else {
          return (
            <button type="button" className={style.sumbit_disablebtn}>
              {intl.formatMessage({ id: 'swap' })}
            </button>
          );
        }
      } else if (!inputValue || !inputValue.greaterThan(0)) {
        return (
          <button type="button" className={style.sumbit_disablebtn}>
            {intl.formatMessage({ id: 'enterAmount' })}
          </button>
        );
      } else if (!inputBalance || inputBalance.lessThan(inputValue)) {
        return (
          <button type="button" className={style.sumbit_disablebtn}>
            {intl.formatMessage({ id: 'insufficientBalance' })}
          </button>
        );
      } else {
        if (inputCurrency.isNative || approve) {
          if (allowSwap) {
            return (
              <button
                type="button"
                className={style.sumbit_btn}
                onClick={() => {
                  setReviewVisible(true);
                }}
              >
                {intl.formatMessage({ id: 'swap' })}
              </button>
            );
          } else {
            return (
              <button type="button" className={style.sumbit_disablebtn}>
                {intl.formatMessage({ id: 'swap' })}
              </button>
            );
          }
        } else {
          return (
            <button
              type="button"
              className={style.sumbit_unlock}
              onClick={() => {
                setApproveVisible(true);
              }}
            >
              {intl.formatMessage({ id: 'approve' })}
            </button>
          );
        }
      }
    } else {
      return (
        <button type="button" className={style.sumbit_disablebtn}>
          {intl.formatMessage({ id: 'chooseToken' })}
        </button>
      );
    }
  } else {
    return (
      <button type="button" className={style.sumbit_disablebtn}>
        {intl.formatMessage({ id: 'connectWallet' })}
      </button>
    );
  }
};

export default function Swap({ match }: { match: any }) {
  const intl = useIntl();
  const { account, active, chainId } = useActiveWeb3React();
  const [settingVisible, setSettingVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [slippageLimitVisible, setSlippageLimitVisible] = useState(false);
  const [gasPriceVisible, setGasPriceVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [approveVisible, setApproveVisible] = useState(false);
  const [tradeType, setTradeType] = useState(TradeType.EXACT_INPUT);
  const [inputValue, setInputValue] = useState<string>();
  const [outputValue, setOutputValue] = useState<string>();
  const [slippageLimit, setSlippageLimit] = useState<number>(1.0);
  const [outputCurrency, setOutputCurrency] = useState<Currency>();
  const [inputCurrency, setInputCurrency] = useState<Currency>();
  const [
    recipientAddressOrName,
    setRecipientAddressOrName
  ] = useState<string>();
  const inputBalance = useCurrencyBalance(inputCurrency);
  const outputBalance = useCurrencyBalance(outputCurrency);
  const inputCurrencies = useSearch(match.params.inAddress);
  const outputCurrencies = useSearch(match.params.outAddress);
  useMemo(() => {
    if (inputCurrencies && inputCurrencies.length === 0) {
      setInputCurrency(inputCurrencies[0]);
    }
  }, [inputCurrencies]);
  useMemo(() => {
    if (outputCurrencies && outputCurrencies.length === 0) {
      setOutputCurrency(outputCurrencies[0]);
    }
  }, [outputCurrencies]);

  const { approve, approveCallback } = useApproveCallback(
    parseCurrencyAmount(inputCurrency, inputValue),
    ROUTER_ADDRESS[chainId ?? DEFAULT_CHAIN]
  );

  const [amountSpecified, otherCurrency] = useMemo(() => {
    if (tradeType === TradeType.EXACT_INPUT) {
      return [parseCurrencyAmount(inputCurrency, inputValue), outputCurrency];
    } else {
      return [parseCurrencyAmount(outputCurrency, outputValue), inputCurrency];
    }
  }, [inputValue, outputValue, inputCurrency, outputCurrency, tradeType]);

  const trade = useBestTrade(tradeType, amountSpecified, otherCurrency);

  useMemo(() => {
    if (inputValue === '' && tradeType === TradeType.EXACT_INPUT) {
      setOutputValue('');
    } else if (outputValue === '' && tradeType === TradeType.EXACT_OUTPUT) {
      setInputValue('');
    } else if (
      inputCurrency?.wrapped.address === outputCurrency?.wrapped.address
    ) {
      if (tradeType === TradeType.EXACT_INPUT) {
        setOutputValue(inputValue);
      } else if (tradeType === TradeType.EXACT_OUTPUT) {
        setInputValue(outputValue);
      }
    } else {
      if (trade && tradeType === TradeType.EXACT_INPUT) {
        setOutputValue(trade.outputAmount.toExact());
      } else if (trade && tradeType === TradeType.EXACT_OUTPUT) {
        setInputValue(trade.inputAmount.toExact());
      }
    }
  }, [
    inputValue,
    outputValue,
    inputCurrency?.wrapped.address,
    outputCurrency?.wrapped.address,
    trade,
    tradeType
  ]);

  const wrappedCallback = useWrappedCallback(
    parseCurrencyAmount(inputCurrency, inputValue)
  );

  const chooseInput = (currency: Currency) => {
    if (outputCurrency && outputCurrency.equals(currency)) {
      setOutputCurrency(inputCurrency);
    }
    setInputCurrency(currency);
  };

  const chooseOutput = (currency: Currency) => {
    if (inputCurrency && inputCurrency.equals(currency)) {
      setInputCurrency(outputCurrency);
    }
    setOutputCurrency(currency);
  };

  const setInputMax = () => {
    setInputValue(inputBalance?.toExact());
    setTradeType(TradeType.EXACT_INPUT);
  };

  const setOutputMax = () => {
    setOutputValue(outputBalance?.toExact());
    setTradeType(TradeType.EXACT_OUTPUT);
  };

  const setInputAmount = (e: any) => {
    const { value } = e.target;
    setInputValue(value);
    setTradeType(TradeType.EXACT_INPUT);
  };

  const setOutputAmount = (e: any) => {
    const { value } = e.target;
    setOutputValue(value);
    setTradeType(TradeType.EXACT_OUTPUT);
  };

  const setAllowSlippageLimit = (value: number) => {
    setSlippageLimit(value);
    setSlippageLimitVisible(false);
    localStorage.setItem('slippageLimit', value.toString());
  };

  const setRecipient = (e: any) => {
    const { value } = e.target;
    setRecipientAddressOrName(value);
  };

  const swapPosition = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.main_content}>
            <div className={style.main_box}>
              <AmountInBox
                operateLabel={intl.formatMessage({ id: 'buy' })}
                balanceLabel={intl.formatMessage({ id: 'availableBalance' })}
                chooseLabel={intl.formatMessage({ id: 'chooseToken' })}
                value={inputValue}
                balance={inputBalance?.toExact()}
                currency={inputCurrency}
                approve={approve}
                bgVisible
                onChangeValue={setInputAmount}
                onMax={setInputMax}
                onChoose={chooseInput}
              />
              <div className={style.main_exchange} onClick={swapPosition}>
                <i className="iconfont icon-arrowdown" />
              </div>
              <AmountInBox
                operateLabel={intl.formatMessage({ id: 'sell' })}
                balanceLabel={intl.formatMessage({ id: 'availableBalance' })}
                chooseLabel={intl.formatMessage({ id: 'chooseToken' })}
                value={outputValue}
                balance={outputBalance?.toExact()}
                currency={outputCurrency}
                approve
                onChangeValue={setOutputAmount}
                onMax={setOutputMax}
                onChoose={chooseOutput}
              />
            </div>
            <div>
              {addressVisible && (
                <Input
                  placeholder={intl.formatMessage({ id: 'swapReceiveAddress' })}
                  onChange={setRecipient}
                  className={style.address}
                />
              )}
            </div>
            <div className={style.setting}>
              <div className={style.setting_item}>
                <span>
                  {intl.formatMessage({ id: 'slippageLimit' })}
                  <i
                    className={[
                      `${style.setting_item_icon}`,
                      `iconfont icon-question-circle`
                    ].join(' ')}
                  />
                </span>
                <span>
                  {slippageLimit}%
                  <i
                    className={[
                      `${style.setting_item_icon}`,
                      `iconfont icon-down`
                    ].join(' ')}
                    onClick={() => {
                      setSlippageLimitVisible(true);
                    }}
                  />
                </span>
              </div>
              <div className={style.setting_item}>
                <span>
                  {intl.formatMessage({ id: 'fee' })}
                  <i
                    className={[
                      `${style.setting_item_icon}`,
                      `iconfont icon-question-circle`
                    ].join(' ')}
                  />
                </span>
                <span>0.3%</span>
              </div>
            </div>
            {trade ? (
              <SwapDetailsDropdown
                slippageLimit={slippageLimit}
                trade={trade}
              />
            ) : (
              <div className={style.danger}>
                {intl.formatMessage({ id: 'noLiquidityDescription' })}
              </div>
            )}
            <div className={style.sumbit}>
              <button
                type="button"
                aria-hidden="true"
                className={style.sumbit_setting}
                onClick={() => {
                  setSettingVisible(true);
                }}
              >
                <i className="iconfont icon-setting" />
              </button>
              <SwapButton
                intl={intl}
                active={active}
                account={account}
                inputCurrency={inputCurrency}
                outputCurrency={outputCurrency}
                inputBalance={inputBalance}
                inputValue={parseCurrencyAmount(inputCurrency, inputValue)}
                approve={approve}
                allowSwap={trade ? true : false}
                setReviewVisible={setReviewVisible}
                setApproveVisible={setApproveVisible}
                onWrappedCallback={wrappedCallback}
              />
            </div>
          </div>
          <TabFooter title={intl.formatMessage({ id: 'exchange' })} />
        </div>
      </div>
      <Setting
        visible={settingVisible}
        addressVisible={addressVisible}
        openSlippageLimit={() => {
          setSettingVisible(false);
          setSlippageLimitVisible(true);
        }}
        openAddress={setAddressVisible}
        openGasPrice={() => {
          setSettingVisible(false);
          setGasPriceVisible(true);
        }}
        onCancel={() => {
          setSettingVisible(false);
        }}
      />
      <SlippageLimit
        visible={slippageLimitVisible}
        onOk={setAllowSlippageLimit}
        onCancel={() => {
          setSlippageLimitVisible(false);
        }}
        slippageLimit={slippageLimit}
      />
      <GasPrice
        visible={gasPriceVisible}
        onOk={() => {
          setGasPriceVisible(false);
        }}
        onCancel={() => {
          setGasPriceVisible(false);
        }}
      />
      <ConfirmSwap
        trade={trade ?? undefined}
        slippageLimit={slippageLimit}
        visible={reviewVisible}
        recipientAddressOrName={recipientAddressOrName}
        onCancel={() => {
          setReviewVisible(false);
        }}
        onOk={() => {
          setReviewVisible(false);
        }}
      />
      <Approve
        visible={approveVisible}
        currency={inputCurrency}
        onApprove={approveCallback}
        onCancel={() => {
          setApproveVisible(false);
        }}
      />
    </div>
  );
}
