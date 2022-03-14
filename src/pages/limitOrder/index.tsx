import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useApproveCallback } from '../../hooks/useApproveCallback';
import { useCurrencyBalance } from '../../hooks/useCurrencyBalance';
import { TradeType, Currency, CurrencyAmount } from '@uniswap/sdk-core';
import Setting from '../../components/setting';
import SlippageLimit from '../../components/slippageLimit';
import Input from '../../components/input';
import AmountInBox from '../../components/amountInBox';
import GasPrice from '../../components/gasPrice';
import TabFooter from '../../components/tabFooter';
import Select from '../../components/select';
import RatioBox from '../../components/ratioBox';
import style from './index.module.scss';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { ROUTER_ADDRESS } from '../../constants/address';
import { DEFAULT_CHAIN } from '../../constants/misc';
import { parseCurrencyAmount } from '../../utils/parse';

const SwapButton = ({
  intl,
  active,
  account,
  inputCurrency,
  outputCurrency,
  inputValue,
  inputBalance,
  allowSwap,
  setReviewVisible
}: {
  intl: any;
  active: boolean;
  account?: string;
  inputCurrency?: Currency;
  outputCurrency?: Currency;
  inputValue?: CurrencyAmount<Currency>;
  inputBalance?: CurrencyAmount<Currency>;
  allowSwap: boolean;
  setReviewVisible: (visible: boolean) => void;
}) => {
  if (account && active) {
    if (inputCurrency?.wrapped.address && outputCurrency?.wrapped.address) {
      if (inputCurrency?.wrapped.address === outputCurrency?.wrapped.address) {
        return (
          <button type="button" className={style.sumbit_disablebtn}>
            {intl.formatMessage({ id: 'swap' })}
          </button>
        );
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

export interface Order {
  inputCurrency: Currency;
  inputValue: number;
  inputApproveAmount: number;
  outputCurrency: Currency;
  outputValue: number;
  outputApproveAmount: number;
  outputAccount: string;
  slippageLimit: number;
  ratio: number;
}

export default function LimitOrder() {
  const intl = useIntl();
  const { account, active, chainId } = useActiveWeb3React();
  const [settingVisible, setSettingVisible] = useState(false);
  const [slippageLimitVisible, setSlippageLimitVisible] = useState(false);
  const [gasPriceVisible, setGasPriceVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [expireIn, setExpireIn] = useState('0');
  const [tradeType, setTradeType] = useState(TradeType.EXACT_INPUT);
  const [outputCurrency, setOutputCurrency] = useState<Currency>();
  const [inputCurrency, setInputCurrency] = useState<Currency>();
  const [inputValue, setInputValue] = useState<string>();
  const [outputValue, setOutputValue] = useState<string>();
  const [slippageLimit, setSlippageLimit] = useState<number>(1.0);
  const [ratio, setRatio] = useState<number>(0);
  const [
    recipientAddressOrName,
    setRecipientAddressOrName
  ] = useState<string>();
  const inputBalance = useCurrencyBalance(inputCurrency);
  const outputBalance = useCurrencyBalance(outputCurrency);
  const { approve } = useApproveCallback(
    parseCurrencyAmount(inputCurrency, inputValue),
    ROUTER_ADDRESS[chainId ?? DEFAULT_CHAIN]
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

  const setSwapRatio = (e: any) => {
    const { value } = e.target;
    setRatio(value);
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
              <div className={style.main_box_radio}>
                <RatioBox
                  operateLabel={intl.formatMessage({ id: 'ratio' })}
                  rightLabel={intl.formatMessage({ id: 'lock' })}
                  chooseLabel={intl.formatMessage({ id: 'chooseToken' })}
                  value={ratio}
                  currency={outputCurrency}
                  approve={approve}
                  onChangeValue={setSwapRatio}
                />
                <div className={style.main_box_radio_expire}>
                  <span className={style.main_box_radio_expire_title}>
                    Expire in
                  </span>
                  <Select
                    value={expireIn}
                    options={[
                      { label: '1 Hour', value: '0' },
                      { label: '24 Hour', value: '1' },
                      { label: '3 Days', value: '2' },
                      { label: '7 Days', value: '3' },
                      { label: '30 Days', value: '4' }
                    ]}
                    onChange={(value: string) => {
                      setExpireIn(value);
                    }}
                  />
                </div>
              </div>
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
                approve={true}
                onChangeValue={setOutputAmount}
                onMax={setOutputMax}
                onChoose={chooseOutput}
              />
            </div>
            <div>
              {addressVisible && (
                <Input
                  value={recipientAddressOrName}
                  placeholder={intl.formatMessage({ id: 'swapReceiveAddress' })}
                  onChange={setRecipient}
                  className={style.address}
                />
              )}
            </div>
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
                allowSwap={false}
                setReviewVisible={setReviewVisible}
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
    </div>
  );
}
