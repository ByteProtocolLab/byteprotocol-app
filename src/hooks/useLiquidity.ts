import { BigNumber } from 'ethers';
import {
  Currency,
  CurrencyAmount,
  TradeType,
  Price,
  Fraction,
  Percent
} from '@uniswap/sdk-core';
import { getLiquidity, pairFor, quote, sortTokens } from '../utils/libarary';
import { useGetReserves, useTotalSupply } from './usePair';
import { useMemo } from 'react';
import JSBI from 'jsbi';

export interface Liquidity {
  noLiquidity: boolean;
  inputAmount: CurrencyAmount<Currency>;
  outputAmount: CurrencyAmount<Currency>;
  rate: Price<Currency, Currency> | undefined;
  liquidity: Fraction;
  share: Percent | undefined;
}

export function useLiquidity(
  tradeType: TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT,
  amountSpecified?: CurrencyAmount<Currency>,
  otherCurrency?: Currency
): Liquidity | undefined {
  const pairAddress = useMemo(() => {
    if (
      !amountSpecified ||
      !otherCurrency ||
      amountSpecified.currency.wrapped.address === otherCurrency.wrapped.address
    )
      return undefined;
    return pairFor(
      amountSpecified.currency.wrapped.address,
      otherCurrency.wrapped.address
    );
  }, [amountSpecified, otherCurrency]);

  const reserve = useGetReserves(pairAddress);

  const totalSupply = useTotalSupply(pairAddress);

  return useMemo(() => {
    if (!amountSpecified || !otherCurrency || !pairAddress) return undefined;
    const [token0] = sortTokens(
      amountSpecified.currency.wrapped.address,
      otherCurrency.wrapped.address
    );
    if (
      reserve &&
      reserve[pairAddress + '_reserve0'] &&
      reserve[pairAddress + '_reserve1']
    ) {
      const reserve0 = reserve[pairAddress + '_reserve0'];
      const reserve1 = reserve[pairAddress + '_reserve1'];
      const [reserveA, reserveB] =
        token0 === amountSpecified.currency.wrapped.address
          ? [reserve0, reserve1]
          : [reserve1, reserve0];

      let inputAmount, outputAmount, rate;
      if (tradeType === TradeType.EXACT_INPUT) {
        if (amountSpecified.equalTo(0)) {
          inputAmount = amountSpecified;
          outputAmount = CurrencyAmount.fromRawAmount(otherCurrency, 0);
        } else {
          const amountB = quote(
            BigNumber.from('0x' + amountSpecified.quotient.toString(16)),
            reserveA,
            reserveB
          );
          inputAmount = amountSpecified;
          outputAmount = CurrencyAmount.fromRawAmount(
            otherCurrency,
            amountB.toHexString()
          );
        }

        const amount = quote(
          BigNumber.from(
            '0x' + (10 ** amountSpecified.currency.decimals).toString(16)
          ),
          reserveA,
          reserveB
        );

        rate = new Price({
          quoteAmount: CurrencyAmount.fromRawAmount(
            otherCurrency,
            amount.toHexString()
          ),
          baseAmount: CurrencyAmount.fromRawAmount(
            amountSpecified.currency,
            10 ** amountSpecified.currency.decimals
          )
        });
      } else {
        if (amountSpecified.equalTo(0)) {
          inputAmount = CurrencyAmount.fromRawAmount(otherCurrency, 0);
          outputAmount = amountSpecified;
        } else {
          const amountA = quote(
            BigNumber.from('0x' + amountSpecified.quotient.toString(16)),
            reserveA,
            reserveB
          );
          inputAmount = CurrencyAmount.fromRawAmount(
            otherCurrency,
            amountA.toHexString()
          );
          outputAmount = amountSpecified;
        }

        const amount = quote(
          BigNumber.from('0x' + (10 ** otherCurrency.decimals).toString(16)),
          reserveB,
          reserveA
        );

        rate = new Price({
          quoteAmount: CurrencyAmount.fromRawAmount(
            amountSpecified.currency,
            amount.toHexString()
          ),
          baseAmount: CurrencyAmount.fromRawAmount(
            otherCurrency,
            10 ** otherCurrency.decimals
          )
        });
      }

      const [amount0, amount1] =
        token0 === inputAmount.currency.wrapped.address
          ? [inputAmount.quotient, outputAmount.quotient]
          : [outputAmount.quotient, inputAmount.quotient];

      const liquidity = getLiquidity(
        JSBI.BigInt(totalSupply ? totalSupply.toHexString() : 0),
        JSBI.BigInt(reserve0.toHexString()),
        JSBI.BigInt(reserve1.toHexString()),
        amount0,
        amount1
      );

      const share = new Percent(
        amount0,
        JSBI.ADD(amount0, JSBI.BigInt(reserve0.toHexString()))
      );

      return {
        noLiquidity: false,
        inputAmount,
        outputAmount,
        rate,
        liquidity,
        share
      };
    }
  }, [
    amountSpecified,
    otherCurrency,
    pairAddress,
    reserve,
    totalSupply,
    tradeType
  ]);
}
