import { TransactionResponse } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { MAX_VALUE } from '../constants/misc';
import useActiveWeb3React from './useActiveWeb3React';
import { useAllowance, useApprove } from './useErc20';
import { CurrencyAmount, Currency } from '@uniswap/sdk-core';
import JSBI from 'jsbi';

export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Currency>,
  spender?: string
): { approve: boolean; approveCallback: () => Promise<TransactionResponse> } {
  const { account } = useActiveWeb3React();
  const allowance = useAllowance(
    amountToApprove?.currency.wrapped.address,
    account,
    spender
  );
  const approveCallback = useApprove(
    amountToApprove?.currency.wrapped.address,
    spender,
    BigNumber.from(MAX_VALUE)
  );
  return useMemo(() => {
    if (allowance) {
      const allowancesAmount = JSBI.BigInt(allowance?.toHexString());
      return {
        approve: JSBI.GT(allowancesAmount, amountToApprove?.quotient),
        approveCallback
      };
    }
    return { approve: false, approveCallback };
  }, [allowance, amountToApprove?.quotient, approveCallback]);
}
