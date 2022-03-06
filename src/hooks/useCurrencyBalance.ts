import { aggregate } from '@makerdao/multicall';
import { useMemo, useState } from 'react';
import { CONFIG, DEFAULT_CHAIN } from '../constants/misc';
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import useActiveWeb3React from './useActiveWeb3React';
import { BigNumber } from 'ethers';

export function useCurrencyBalance(
  currency?: Currency
): CurrencyAmount<Currency> | undefined {
  const currencies = useMemo(() => {
    return currency ? [currency] : [];
  }, [currency]);
  const currencyBalances = useCurrencyBalances(currencies);
  return currency ? currencyBalances[currency?.wrapped.address] : undefined;
}

export function useCurrencyBalances(currencies: Currency[]) {
  const { account, chainId } = useActiveWeb3React();
  const [balances, setBalances] = useState<{
    [key: string]: CurrencyAmount<Currency>;
  }>({});
  useMemo(() => {
    if (!account || !currencies) return;
    const calls = currencies.map((currency) => {
      if (currency.isNative) {
        return {
          call: ['getEthBalance(address)(uint256)', account],
          returns: [
            [
              currency.wrapped.address,
              (val: BigNumber) =>
                CurrencyAmount.fromRawAmount(currency, val.toHexString())
            ]
          ]
        };
      } else {
        return {
          target: currency.wrapped.address,
          call: ['balanceOf(address)(uint256)', account ?? ''],
          returns: [
            [
              currency.wrapped.address,
              (val: BigNumber) =>
                CurrencyAmount.fromRawAmount(currency, val.toHexString())
            ]
          ]
        };
      }
    });
    aggregate(calls, CONFIG[chainId ?? DEFAULT_CHAIN])
      .then((res: any) => {
        setBalances(res.results.transformed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [account, chainId, currencies]);

  return balances;
}
