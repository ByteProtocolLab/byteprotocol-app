import React, { useState } from 'react';
import { Currency } from '@uniswap/sdk-core';
import { useIntl } from 'react-intl';
import SelectBox from '../selectBox';
import style from './index.module.scss';
import { Link } from 'react-router-dom';

export default function ImportPanel({
  importPair
}: {
  importPair: (currencyA?: Currency, currencyB?: Currency) => void;
}) {
  const intl = useIntl();
  const [currencyA, setCurrencyA] = useState<Currency>();
  const [currencyB, setCurrencyB] = useState<Currency>();

  const onSetCurrencyA = (currency: Currency) => {
    if (currencyB && currencyB.equals(currency)) {
      setCurrencyB(currencyA);
    }
    setCurrencyA(currency);
  };

  const onSetCurrencyB = (currency: Currency) => {
    if (currencyA && currencyA.equals(currency)) {
      setCurrencyA(currencyB);
    }
    setCurrencyB(currency);
  };

  return (
    <div className={style.wrapper}>
      <Link
        to={`/supply/${currencyA?.wrapped.address ?? '0x0'}/${
          currencyB?.wrapped.address ?? '0x0'
        }`}
        className={style.target}
        onClick={() => {
          importPair(currencyA, currencyB);
        }}
      >
        <i className="iconfont icon-plus" />
        {intl.formatMessage({ id: 'addLiquid' })}
      </Link>
      <div className={style.box}>
        <SelectBox
          chooseLabel={intl.formatMessage({ id: 'chooseToken' })}
          currency={currencyA}
          onChoose={onSetCurrencyA}
        />
        <SelectBox
          chooseLabel={intl.formatMessage({ id: 'chooseToken' })}
          currency={currencyB}
          onChoose={onSetCurrencyB}
        />
      </div>
      <button
        className={style.btn}
        onClick={() => {
          importPair(currencyA, currencyB);
        }}
      >
        {intl.formatMessage({ id: 'import' })}
      </button>
    </div>
  );
}
