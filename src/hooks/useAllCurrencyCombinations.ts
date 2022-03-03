import { useMemo } from 'react';
import {
  ADDITIONAL_BASES,
  BASES_TO_CHECK_TRADES_AGAINST
} from '../constants/routing';
import { Currency, Token } from '@uniswap/sdk-core';

export function useAllCurrencyCombinations(
  currencyA?: Currency,
  currencyB?: Currency
) {
  const chainId = currencyA?.chainId;
  const [tokenA, tokenB] = [currencyA?.wrapped, currencyB?.wrapped];
  const bases: Token[] = useMemo(() => {
    if (!chainId || chainId !== tokenB?.chainId) return [];

    const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? [];
    const additionalA = tokenA
      ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? []
      : [];
    const additionalB = tokenB
      ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? []
      : [];
    return [...common, ...additionalA, ...additionalB];
  }, [chainId, tokenA, tokenB]);
  const basePairs: [Token, Token][] = useMemo<[Token, Token][]>(() => {
    return bases.flatMap((base): [Token, Token][] =>
      bases.map((otherBase) => [base, otherBase])
    );
  }, [bases]);

  return useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB] as [Token, Token],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs
          ]
            // filter out invalid pairs comprised of the same asset (e.g. WETH<>WETH)
            .filter(([t0, t1]) => !t0.equals(t1))
            // filter out duplicate pairs
            .filter(([t0, t1], i, otherPairs) => {
              // find the first index in the array at which there are the same 2 tokens as the current
              const firstIndexInOtherPairs = otherPairs.findIndex(
                ([t0Other, t1Other]) => {
                  return (
                    (t0.equals(t0Other) && t1.equals(t1Other)) ||
                    (t0.equals(t1Other) && t1.equals(t0Other))
                  );
                }
              );
              // only accept the first occurence of the same 2 tokens
              return firstIndexInOtherPairs === i;
            })
        : [],
    [tokenA, tokenB, bases, basePairs]
  );
}
