import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useApproveCallback } from '../../hooks/useApproveCallback';
import { useCurrencyBalance } from '../../hooks/useCurrencyBalance';
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { NATIVE_CURRENCY, USDC } from '../../constants/tokens';
import Setting from '../../components/setting';
import SlippageLimit from '../../components/slippageLimit';
import Alert from '../../components/alert';
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
  const { active, chainId } = useActiveWeb3React();
  const [settingVisible, setSettingVisible] = useState(false);
  const [slippageLimitVisible, setSlippageLimitVisible] = useState(false);
  const [gasPriceVisible, setGasPriceVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [expireIn, setExpireIn] = useState('0');
  const [swap, setSwap] = useState<Order>({
    inputCurrency: NATIVE_CURRENCY[chainId ?? DEFAULT_CHAIN],
    inputValue: 0,
    inputApproveAmount: 0,
    outputCurrency: USDC,
    outputValue: 0,
    outputApproveAmount: 0,
    outputAccount: '',
    slippageLimit: 1.0,
    ratio: 0
  });
  const inputBalance = useCurrencyBalance(swap.inputCurrency);
  const outputBalance = useCurrencyBalance(swap.outputCurrency);
  const { approve } = useApproveCallback(
    CurrencyAmount.fromRawAmount(
      swap.outputCurrency,
      Math.floor(swap.outputValue * 10 ** swap.outputCurrency.wrapped.decimals)
    ),
    ROUTER_ADDRESS[chainId ?? DEFAULT_CHAIN]
  );

  const chooseInput = (currency: Currency) => {
    const target = { ...swap };
    if (target.outputCurrency === currency) {
      target.outputCurrency = target.inputCurrency;
    }
    target.inputCurrency = currency;
    setSwap(target);
  };

  const chooseOutput = (currency: Currency) => {
    const target = { ...swap };
    if (target.inputCurrency === currency) {
      target.inputCurrency = target.outputCurrency;
    }
    target.outputCurrency = currency;
    setSwap(target);
  };

  const setInputMax = () => {
    const target = { ...swap };
    target.inputValue = inputBalance
      ? parseFloat(inputBalance.toSignificant(6))
      : 0;
    setSwap(target);
  };

  const setOutputMax = () => {
    const target = { ...swap };
    target.outputValue = outputBalance
      ? parseFloat(outputBalance.toSignificant(6))
      : 0;
    setSwap(target);
  };

  const setOutputValue = (e: any) => {
    const { value } = e.target;
    const target = { ...swap };
    target.outputValue = value;
    if (target.ratio !== 0) {
      target.inputValue = value / target.ratio;
    }
    setSwap(target);
  };

  const setInputValue = (e: any) => {
    const { value } = e.target;
    const target = { ...swap };
    target.inputValue = value;
    target.outputValue = value * target.ratio;
    setSwap(target);
  };

  const setSlippageLimit = (value: number) => {
    const target = { ...swap };
    target.slippageLimit = value;
    setSwap(target);
    setSlippageLimitVisible(false);
  };

  const setOutputAccount = (e: any) => {
    const { value } = e.target;
    const target = { ...swap };
    target.outputAccount = value;
    setSwap(target);
  };

  const setRadio = async (e: any) => {
    const { value } = e.target;
    const target = { ...swap };
    target.ratio = value;
    target.outputValue = target.inputValue * value;
    setSwap(target);
  };

  const swapPosition = () => {
    const target = { ...swap };
    target.inputCurrency = swap.outputCurrency;
    target.outputCurrency = swap.inputCurrency;
    setSwap(target);
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
                value={swap.inputValue.toString()}
                balance={inputBalance?.toExact()}
                currency={swap.inputCurrency}
                approve={approve}
                bgVisible
                onChangeValue={setInputValue}
                onMax={setInputMax}
                onChoose={chooseInput}
              />
              <div className={style.main_box_radio}>
                <RatioBox
                  operateLabel={intl.formatMessage({ id: 'ratio' })}
                  rightLabel={intl.formatMessage({ id: 'lock' })}
                  chooseLabel={intl.formatMessage({ id: 'chooseToken' })}
                  value={swap.ratio}
                  currency={swap.outputCurrency}
                  approve={approve}
                  onChangeValue={setRadio}
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
                value={swap.outputValue.toString()}
                balance={outputBalance?.toExact()}
                currency={swap.outputCurrency}
                approve={true}
                onChangeValue={setOutputValue}
                onMax={setOutputMax}
                onChoose={chooseOutput}
              />
            </div>
            <div>
              {addressVisible && (
                <Input
                  placeholder={intl.formatMessage({ id: 'swapReceiveAddress' })}
                  onChange={setOutputAccount}
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
              {!active ? (
                <button type="button" className={style.sumbit_disablebtn}>
                  {intl.formatMessage({ id: 'connectWallet' })}
                </button>
              ) : swap.inputCurrency.wrapped.address &&
                swap.outputCurrency.wrapped.address ? (
                swap.inputValue <= 0 ? (
                  <button type="button" className={style.sumbit_disablebtn}>
                    {intl.formatMessage({ id: 'enterAmount' })}
                  </button>
                ) : swap.inputCurrency.isNative || approve ? (
                  inputBalance &&
                  parseFloat(inputBalance.toSignificant(6)) <
                    swap.inputValue ? (
                    <button type="button" className={style.sumbit_disablebtn}>
                      {intl.formatMessage({ id: 'insufficientBalance' })}
                    </button>
                  ) : (
                    <button type="button" className={style.sumbit_btn}>
                      {intl.formatMessage({ id: 'swap' })}
                    </button>
                  )
                ) : (
                  <button type="button" className={style.sumbit_unlock}>
                    {intl.formatMessage({ id: 'approve' })}
                  </button>
                )
              ) : (
                <button type="button" className={style.sumbit_disablebtn}>
                  {intl.formatMessage({ id: 'chooseToken' })}
                </button>
              )}
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
        onOk={setSlippageLimit}
        onCancel={() => {
          setSlippageLimitVisible(false);
        }}
        slippageLimit={swap.slippageLimit}
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
      <Alert
        visible={alertVisible}
        title="Use suggestions"
        message="In development"
        describe="The limit order is in the development stage, please do not use it"
        btnLabel={intl.formatMessage({ id: 'close' })}
        onCancel={() => {
          setAlertVisible(false);
        }}
      />
    </div>
  );
}
