import { Currency, CurrencyAmount, Percent } from '@uniswap/sdk-core';
import { useRouterContract } from './useContract';
import { calculateGasMargin, calculateSlippageAmount } from '../utils/common';
import { ZERO_PERCENT } from '../constants/misc';
import { TransactionResponse } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import useTransactionDeadline from './useTransactionDeadline';
import useActiveWeb3React from './useActiveWeb3React';
import { useENSAddress } from './useENSAddress';
import { ChainId } from '../connectors/chains';

export default function useAddLiquidity(
  allowedSlippage: Percent,
  noLiquidity: boolean,
  currencyAmountA?: CurrencyAmount<Currency>,
  currencyAmountB?: CurrencyAmount<Currency>,
  recipientAddressOrName?: string
) {
  const { account, library, chainId } = useActiveWeb3React();
  const routerContract = useRouterContract(chainId ?? ChainId.MAINNET);
  const deadline = useTransactionDeadline();
  const recipient = useENSAddress(recipientAddressOrName);

  if (
    !currencyAmountA ||
    !currencyAmountB ||
    !library ||
    !account ||
    !routerContract ||
    !deadline
  )
    return undefined;
  return async (): Promise<TransactionResponse> => {
    const amountsMin = [
      calculateSlippageAmount(
        currencyAmountA,
        noLiquidity ? ZERO_PERCENT : allowedSlippage
      )[0],
      calculateSlippageAmount(
        currencyAmountB,
        noLiquidity ? ZERO_PERCENT : allowedSlippage
      )[0]
    ];

    let estimate: any,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null;
    if (
      currencyAmountA.currency.isNative ||
      currencyAmountB.currency.isNative
    ) {
      estimate = routerContract.estimateGas.addLiquidityETH;
      method = routerContract.addLiquidityETH;
      args = [
        (currencyAmountB.currency.isNative
          ? currencyAmountA.currency
          : currencyAmountB.currency
        )?.wrapped?.address ?? '', // token
        (currencyAmountB.currency.isNative
          ? currencyAmountA
          : currencyAmountB
        ).numerator.toString(), // token desired
        amountsMin[currencyAmountB.currency.isNative ? 0 : 1].toString(), // token min
        amountsMin[currencyAmountB.currency.isNative ? 1 : 0].toString(), // eth min
        recipient ?? account ?? undefined,
        deadline.toHexString()
      ];
      value = BigNumber.from(
        (currencyAmountB.currency.isNative
          ? currencyAmountB
          : currencyAmountA
        ).numerator.toString()
      );
    } else {
      estimate = routerContract.estimateGas.addLiquidity;
      method = routerContract.addLiquidity;
      args = [
        currencyAmountA.currency.wrapped?.address ?? '',
        currencyAmountB.currency.wrapped?.address ?? '',
        currencyAmountA.numerator.toString(),
        currencyAmountB.numerator.toString(),
        amountsMin[0].toString(),
        amountsMin[1].toString(),
        recipient ?? account ?? undefined,
        deadline.toHexString()
      ];
      value = null;
    }

    const estimatedGasLimit = await estimate(
      ...args,
      value ? { value } : {}
    ).catch((error: Error) => {
      throw error;
    });

    return method(...args, {
      ...(value ? { value } : {}),
      gasLimit: calculateGasMargin(estimatedGasLimit)
    });
  };
}
