import { CurrencyAmount, Currency } from '@uniswap/sdk-core';
import JSBI from 'jsbi';

export function parseCurrencyAmount(
  currency?: Currency,
  value?: string
): CurrencyAmount<Currency> | undefined {
  if (!currency || !value || !value.match(/^\d*\.?\d+$/)) {
    return undefined;
  }

  const [whole, fraction] = value.split('.');

  const decimals = fraction?.length ?? 0;
  const withoutDecimals = JSBI.BigInt((whole ?? '') + (fraction ?? ''));

  const rawAmount = JSBI.EQ(decimals, 0)
    ? JSBI.multiply(
        JSBI.BigInt(withoutDecimals),
        JSBI.BigInt(10 ** currency.decimals)
      )
    : JSBI.divide(
        JSBI.multiply(
          JSBI.BigInt(withoutDecimals),
          JSBI.BigInt(10 ** currency.decimals)
        ),
        JSBI.BigInt(10 ** decimals)
      );

  return CurrencyAmount.fromRawAmount(currency, rawAmount);
}
