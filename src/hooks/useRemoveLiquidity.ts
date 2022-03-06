import { Currency, CurrencyAmount, Percent, Fraction } from '@uniswap/sdk-core';
import useActiveWeb3React from './useActiveWeb3React';
import useTransactionDeadline from './useTransactionDeadline';
import { useRouterContract } from './useContract';
import { SignatureData } from './useErc20Permit';
import { calculateGasMargin, calculateSlippageAmount } from '../utils/common';
import { BigNumber } from 'ethers';
import { DEFAULT_CHAIN } from '../constants/misc';

export function useRemoveLiquidity(
  approval: boolean,
  signatureData: SignatureData | undefined,
  allowedSlippage: Percent,
  liquidityAmount?: Fraction,
  currencyAmountA?: CurrencyAmount<Currency>,
  currencyAmountB?: CurrencyAmount<Currency>
) {
  const { account, chainId } = useActiveWeb3React();
  const routerContract = useRouterContract(chainId ?? DEFAULT_CHAIN);
  const deadline = useTransactionDeadline();
  if (
    !account ||
    !deadline ||
    !routerContract ||
    !liquidityAmount ||
    !currencyAmountA ||
    !currencyAmountB
  )
    return undefined;

  return async () => {
    const oneCurrencyIsETH =
      currencyAmountA.currency.isNative || currencyAmountB.currency.isNative;

    const currencyBIsETH = currencyAmountB.currency.isNative;

    const amountsMin = [
      calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      calculateSlippageAmount(currencyAmountB, allowedSlippage)[0]
    ];

    let methodNames: string[],
      args: Array<string | string[] | number | boolean>;
    if (approval) {
      if (oneCurrencyIsETH) {
        methodNames = [
          'removeLiquidityETH',
          'removeLiquidityETHSupportingFeeOnTransferTokens'
        ];
        args = [
          currencyBIsETH
            ? currencyAmountA.currency.wrapped.address
            : currencyAmountB.currency.wrapped.address,
          liquidityAmount.quotient.toString(),
          currencyBIsETH ? amountsMin[0].toString() : amountsMin[1].toString(),
          currencyBIsETH ? amountsMin[1].toString() : amountsMin[0].toString(),
          account,
          deadline.toHexString()
        ];
      } else {
        methodNames = ['removeLiquidity'];
        args = [
          currencyAmountA.currency.wrapped.address,
          currencyAmountB.currency.wrapped.address,
          liquidityAmount.quotient.toString(),
          amountsMin[0].toString(),
          amountsMin[0].toString(),
          account,
          deadline.toHexString()
        ];
      }
    } else if (signatureData) {
      if (oneCurrencyIsETH) {
        methodNames = [
          'removeLiquidityETHWithPermit',
          'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens'
        ];
        args = [
          currencyBIsETH
            ? currencyAmountA.currency.wrapped.address
            : currencyAmountB.currency.wrapped.address,
          liquidityAmount.quotient.toString(),
          currencyBIsETH ? amountsMin[0].toString() : amountsMin[1].toString(),
          currencyBIsETH ? amountsMin[1].toString() : amountsMin[0].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s
        ];
      } else {
        methodNames = ['removeLiquidityWithPermit'];
        args = [
          currencyAmountA.currency.wrapped.address,
          currencyAmountB.currency.wrapped.address,
          liquidityAmount.quotient.toString(),
          amountsMin[0].toString(),
          amountsMin[0].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s
        ];
      }
    } else {
      throw new Error(
        'Attempting to confirm without approval or a signature. Please contact support.'
      );
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        routerContract.estimateGas[methodName](...args)
          .then((estimateGas) => calculateGasMargin(estimateGas))
          .catch((error) => {
            console.error(`estimateGas failed`, methodName, args, error);
            return undefined;
          })
      )
    );

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex(
      (safeGasEstimate) => BigNumber.isBigNumber(safeGasEstimate)
    );

    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.');
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation];
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation];

      return routerContract[methodName](...args, {
        gasLimit: safeGasEstimate
      });
    }
  };
}
