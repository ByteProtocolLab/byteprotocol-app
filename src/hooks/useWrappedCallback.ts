import { useWrappedTokenContract } from './useContract';
import { CurrencyAmount, Currency } from '@uniswap/sdk-core';
import { useCallback } from 'react';

export function useWrappedCallback(amount?: CurrencyAmount<Currency>) {
  const wrappedTokenContract = useWrappedTokenContract(
    amount?.currency.wrapped.address
  );
  return useCallback(() => {
    if (!amount || !wrappedTokenContract) return undefined;
    if (amount.currency.isNative) {
      return wrappedTokenContract
        .deposit({
          value: `0x${amount.quotient.toString(16)}`
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      return wrappedTokenContract
        .withdraw(`0x${amount.quotient.toString(16)}`)
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [amount, wrappedTokenContract]);
}
