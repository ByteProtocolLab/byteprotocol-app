import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useApproveCallback } from '../../hooks/useApproveCallback';
import { useCurrencyBalance } from '../../hooks/useCurrencyBalance';
import { useLiquidity } from '../../hooks/useLiquidity';
import { TradeType, Currency, CurrencyAmount, Price } from '@uniswap/sdk-core';
import AmountInBox from '../../components/amountInBox';
import GasPrice from '../../components/gasPrice';
import TabFooter from '../../components/tabFooter';
import Setting from '../../components/setting';
import SlippageLimit from '../../components/slippageLimit';
import Input from '../../components/input';
import Approve from '../../components/approve';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import ConfirmSupply from '../../components/confirmSupply';
import LiquidDetailsDropdown from '../../components/liquidDetailsDropdown';
import { ROUTER_ADDRESS } from '../../constants/address';
import { parseCurrencyAmount } from '../../utils/parse';
import { DEFAULT_CHAIN, ONE_HUNDRED_PERCENT, ZERO } from '../../constants/misc';
import { getLiquidity } from '../../utils/libarary';
import JSBI from 'jsbi';
import style from './index.module.scss';
import { useSearch } from '../../hooks/useSearch';

const SupplyButton = ({
  intl,
  active,
  account,
  inputCurrency,
  outputCurrency,
  inputValue,
  outputValue,
  inputBalance,
  outputBalance,
  inputApprove,
  outputApprove,
  setReviewVisible,
  setApproveVisible
}: {
  intl: any;
  active: boolean;
  account?: string;
  inputCurrency?: Currency;
  outputCurrency?: Currency;
  inputValue?: CurrencyAmount<Currency>;
  outputValue?: CurrencyAmount<Currency>;
  inputBalance?: CurrencyAmount<Currency>;
  outputBalance?: CurrencyAmount<Currency>;
  inputApprove: boolean;
  outputApprove: boolean;
  setReviewVisible: (visible: boolean) => void;
  setApproveVisible: (visible: boolean) => void;
}) => {
  if (account && active) {
    if (inputCurrency?.wrapped.address && outputCurrency?.wrapped.address) {
      if (inputCurrency?.wrapped.address === outputCurrency?.wrapped.address) {
        return (
          <button type="button" className={style.sumbit_disablebtn}>
            {intl.formatMessage({ id: 'invalidTradingPair' })}
          </button>
        );
      } else if (
        !inputValue ||
        !outputValue ||
        !inputValue.greaterThan(0) ||
        !outputValue.greaterThan(0)
      ) {
        return (
          <button type="button" className={style.sumbit_disablebtn}>
            {intl.formatMessage({ id: 'enterAmount' })}
          </button>
        );
      } else if (
        !inputBalance ||
        !outputBalance ||
        inputBalance.lessThan(inputValue) ||
        outputBalance.lessThan(outputValue)
      ) {
        return (
          <button type="button" className={style.sumbit_disablebtn}>
            {intl.formatMessage({ id: 'insufficientBalance' })}
          </button>
        );
      } else {
        if (
          (inputCurrency.isNative || inputApprove) &&
          (outputCurrency.isNative || outputApprove)
        ) {
          return (
            <button
              type="button"
              className={style.sumbit_btn}
              onClick={() => {
                setReviewVisible(true);
              }}
            >
              {intl.formatMessage({ id: 'immediateSupply' })}
            </button>
          );
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

export default function Supply({
  inAddress,
  outAddress
}: {
  inAddress: string;
  outAddress: string;
}) {
  const intl = useIntl();
  const { account, active, chainId } = useActiveWeb3React();
  const [settingVisible, setSettingVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [slippageLimitVisible, setSlippageLimitVisible] = useState(false);
  const [gasPriceVisible, setGasPriceVisible] = useState(false);
  const [approveVisible, setApproveVisible] = useState(false);
  const [tradeType, setTradeType] = useState(TradeType.EXACT_INPUT);
  const [inputValue, setInputValue] = useState<string>();
  const [outputValue, setOutputValue] = useState<string>();
  const [slippageLimit, setSlippageLimit] = useState<number>(1.0);
  const inputCurrencies = useSearch(inAddress);
  const outputCurrencies = useSearch(outAddress);
  const [outputCurrency, setOutputCurrency] = useState<Currency>(
    inputCurrencies[0]
  );
  const [inputCurrency, setInputCurrency] = useState<Currency>(
    outputCurrencies[0]
  );
  const inputBalance = useCurrencyBalance(inputCurrency);
  const outputBalance = useCurrencyBalance(outputCurrency);
  const [
    recipientAddressOrName,
    setRecipientAddressOrName
  ] = useState<string>();
  const {
    approve: inputApprove,
    approveCallback: inputApproveCallback
  } = useApproveCallback(
    parseCurrencyAmount(inputCurrency, inputValue),
    ROUTER_ADDRESS[chainId ?? DEFAULT_CHAIN]
  );
  const {
    approve: outputApprove,
    approveCallback: outputApproveCallback
  } = useApproveCallback(
    parseCurrencyAmount(outputCurrency, outputValue),
    ROUTER_ADDRESS[chainId ?? DEFAULT_CHAIN]
  );

  const [amountSpecified, otherCurrency] = useMemo(() => {
    if (tradeType === TradeType.EXACT_INPUT) {
      return [
        parseCurrencyAmount(inputCurrency, inputValue ?? '0'),
        outputCurrency
      ];
    } else {
      return [
        parseCurrencyAmount(outputCurrency, outputValue ?? '0'),
        inputCurrency
      ];
    }
  }, [inputValue, outputValue, inputCurrency, outputCurrency, tradeType]);

  const liquidity = useLiquidity(tradeType, amountSpecified, otherCurrency);

  useMemo(() => {
    if (liquidity) {
      if (inputValue === '' && tradeType === TradeType.EXACT_INPUT) {
        setOutputValue('');
      } else if (outputValue === '' && tradeType === TradeType.EXACT_OUTPUT) {
        setInputValue('');
      } else if (tradeType === TradeType.EXACT_OUTPUT) {
        setInputValue(liquidity.inputAmount.toExact());
      } else if (tradeType === TradeType.EXACT_INPUT) {
        setOutputValue(liquidity.outputAmount.toExact());
      }
    }
  }, [inputValue, liquidity, outputValue, tradeType]);

  const liquidityData = useMemo(() => {
    const inputAmount = parseCurrencyAmount(inputCurrency, inputValue);
    const outputAmount = parseCurrencyAmount(outputCurrency, outputValue);
    if (liquidity) {
      return liquidity;
    } else if (
      !liquidity &&
      inputAmount &&
      outputAmount &&
      inputAmount.greaterThan(0) &&
      outputAmount.greaterThan(0)
    ) {
      const liquidity = getLiquidity(
        ZERO,
        ZERO,
        ZERO,
        JSBI.BigInt(inputAmount.quotient.toString()),
        JSBI.BigInt(outputAmount.quotient.toString())
      );
      return {
        noLiquidity: false,
        inputAmount: inputAmount,
        outputAmount: outputAmount,
        rate: new Price({ baseAmount: inputAmount, quoteAmount: outputAmount }),
        liquidity,
        share: ONE_HUNDRED_PERCENT
      };
    } else {
      return undefined;
    }
  }, [inputCurrency, inputValue, liquidity, outputCurrency, outputValue]);

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
  };

  const setRecipient = (e: any) => {
    const { value } = e.target;
    setRecipientAddressOrName(value);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.main_content}>
            <div className={style.main_box}>
              <AmountInBox
                operateLabel={intl.formatMessage({ id: 'amount' })}
                balanceLabel={intl.formatMessage({ id: 'availableBalance' })}
                chooseLabel={intl.formatMessage({ id: 'chooseToken' })}
                value={inputValue}
                balance={inputBalance?.toExact()}
                currency={inputCurrency}
                approve={inputApprove}
                bgVisible
                onChangeValue={setInputAmount}
                onMax={setInputMax}
                onChoose={chooseInput}
              />
              <div className={style.main_exchange}>
                <i className="iconfont icon-plus" />
              </div>
              <AmountInBox
                operateLabel={intl.formatMessage({ id: 'amount' })}
                balanceLabel={intl.formatMessage({ id: 'availableBalance' })}
                chooseLabel={intl.formatMessage({ id: 'chooseToken' })}
                value={outputValue}
                balance={outputBalance?.toExact()}
                currency={outputCurrency}
                approve={outputApprove}
                onChangeValue={setOutputAmount}
                onMax={setOutputMax}
                onChoose={chooseOutput}
              />
            </div>
            <div>
              {addressVisible && (
                <Input
                  placeholder={intl.formatMessage({
                    id: 'liquidityReceivingAddress'
                  })}
                  onChange={setRecipient}
                  className={style.address}
                />
              )}
            </div>
            <div className={style.setting}>
              <div className={style.setting_item}>
                <span>
                  {intl.formatMessage({
                    id: 'slippageLimit'
                  })}
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
                  {intl.formatMessage({
                    id: 'pledgeCost'
                  })}
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
            {(!liquidity || liquidity.noLiquidity) && (
              <div className={style.danger}>
                {intl.formatMessage({ id: 'noLiquidityDescription' })}
              </div>
            )}
            {liquidityData && (
              <LiquidDetailsDropdown liquidity={liquidityData} />
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
              <SupplyButton
                intl={intl}
                active={active}
                account={account}
                inputCurrency={inputCurrency}
                outputCurrency={outputCurrency}
                inputBalance={inputBalance}
                outputBalance={outputBalance}
                inputValue={parseCurrencyAmount(inputCurrency, inputValue)}
                outputValue={parseCurrencyAmount(outputCurrency, outputValue)}
                inputApprove={inputApprove}
                outputApprove={outputApprove}
                setReviewVisible={setReviewVisible}
                setApproveVisible={setApproveVisible}
              />
            </div>
          </div>
          <TabFooter title={intl.formatMessage({ id: 'liquid' })} />
        </div>
      </div>
      <ConfirmSupply
        visible={reviewVisible}
        recipientAddressOrName={recipientAddressOrName}
        slippageLimit={slippageLimit}
        liquidity={liquidityData}
        onCancel={() => {
          setReviewVisible(false);
        }}
        onOk={() => {
          setReviewVisible(false);
        }}
      />
      <Setting
        visible={settingVisible}
        addressVisible={addressVisible}
        openSlippageLimit={() => {
          setSettingVisible(false);
          setSlippageLimitVisible(true);
        }}
        openGasPrice={() => {
          setSettingVisible(false);
          setGasPriceVisible(true);
        }}
        openAddress={setAddressVisible}
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
          console.log('');
        }}
        onCancel={() => {
          setGasPriceVisible(false);
        }}
      />
      <Approve
        visible={approveVisible}
        currency={
          !inputApprove && !inputCurrency?.isNative
            ? inputCurrency
            : !outputApprove && !outputCurrency?.isNative
            ? outputCurrency
            : undefined
        }
        onApprove={
          !inputApprove && !inputCurrency?.isNative
            ? inputApproveCallback
            : !outputApprove && !outputCurrency?.isNative
            ? outputApproveCallback
            : undefined
        }
        onCancel={() => {
          setApproveVisible(false);
        }}
      />
    </div>
  );
}
