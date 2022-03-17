import { useCallback, useEffect, useMemo, useState } from 'react';
import { aggregate, createWatcher, IUpdate } from '@makerdao/multicall';
import {
  Currency,
  Token,
  CurrencyAmount,
  BigintIsh,
  TradeType
} from '@uniswap/sdk-core';
import { Pair, Trade, FACTORY_ADDRESS } from '@byteprotocol/sdk';
import { pairFor, sortTokens } from '../utils/libarary';
import { isTradeBetter } from '../utils/isTradeBetter';
import {
  BETTER_TRADE_LESS_HOPS_THRESHOLD,
  CONFIG,
  DEFAULT_CHAIN
} from '../constants/misc';
import { useAllCurrencyCombinations } from './useAllCurrencyCombinations';
import { isZero } from '../utils/common';
import useActiveWeb3React from './useActiveWeb3React';

export function useBestTrade(
  tradeType: TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT,
  amountSpecified?: CurrencyAmount<Currency>,
  otherCurrency?: Currency,
  { maxHops = 3 } = {}
) {
  const [currencyIn, currencyOut] = useMemo(
    () =>
      tradeType === TradeType.EXACT_INPUT
        ? [amountSpecified?.currency, otherCurrency]
        : [otherCurrency, amountSpecified?.currency],
    [tradeType, amountSpecified, otherCurrency]
  );

  const allCurrencys = useAllCurrencyCombinations(currencyIn, currencyOut);
  const allowedPairs = usePairs(allCurrencys);
  return useMemo(() => {
    if (
      !currencyIn ||
      !currencyOut ||
      !amountSpecified ||
      amountSpecified?.equalTo(0) ||
      currencyIn.wrapped.address === currencyOut.wrapped.address
    ) {
      return;
    }

    if (maxHops === 1) {
      const options = { maxHops: 1, maxNumResults: 1 };
      if (tradeType === TradeType.EXACT_INPUT) {
        const amountIn = amountSpecified;
        return (
          Trade.bestTradeExactIn(
            allowedPairs,
            amountIn,
            currencyOut,
            options
          )[0] ?? null
        );
      } else {
        const amountOut = amountSpecified;
        return (
          Trade.bestTradeExactOut(
            allowedPairs,
            currencyIn,
            amountOut,
            options
          )[0] ?? null
        );
      }
    }

    let bestTradeSoFar: Trade<
      Currency,
      Currency,
      TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT
    > | null = null;

    for (let i = 1; i <= maxHops; i++) {
      const options = { maxHops: i, maxNumResults: 1 };
      let currentTrade: Trade<
        Currency,
        Currency,
        TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT
      > | null;
      if (tradeType === TradeType.EXACT_INPUT) {
        const amountIn = amountSpecified;
        currentTrade =
          Trade.bestTradeExactIn(
            allowedPairs,
            amountIn,
            currencyOut,
            options
          )[0] ?? null;
      } else {
        const amountOut = amountSpecified;
        currentTrade =
          Trade.bestTradeExactOut(
            allowedPairs,
            currencyIn,
            amountOut,
            options
          )[0] ?? null;
      }
      if (
        isTradeBetter(
          bestTradeSoFar,
          currentTrade,
          BETTER_TRADE_LESS_HOPS_THRESHOLD
        )
      ) {
        bestTradeSoFar = currentTrade;
      }
    }

    return bestTradeSoFar;
  }, [
    allowedPairs,
    amountSpecified,
    currencyIn,
    currencyOut,
    maxHops,
    tradeType
  ]);
}

export function usePairs(currencies: [Token, Token][]): Pair[] {
  const pairAddresses = usePairAddresses(currencies);
  const pairReserves = usePairReserves(pairAddresses);
  return useMemo(() => {
    return currencies.map(([tokenA, tokenB]) => {
      const pairAddress = pairFor(tokenA.address, tokenB.address);
      const reserve0 = pairReserves[pairAddress + '_reserve0'];
      const reserve1 = pairReserves[pairAddress + '_reserve1'];
      const [token0Address] = sortTokens(tokenA.address, tokenB.address);
      const [token0, token1] =
        tokenA.address === token0Address ? [tokenA, tokenB] : [tokenB, tokenA];
      return new Pair(
        CurrencyAmount.fromRawAmount(token0, reserve0 ? reserve0 : 0),
        CurrencyAmount.fromRawAmount(token1, reserve1 ? reserve1 : 0)
      );
    });
  }, [currencies, pairReserves]);
}

export function usePairAddresses(currencies: [Token, Token][]) {
  const { chainId } = useActiveWeb3React();
  const [pairAddresses, setPairAddresses] = useState<string[]>([]);
  useMemo(() => {
    const calls = currencies.map(([tokenA, tokenB]) => {
      const pairAddress = pairFor(tokenA.address, tokenB.address);
      return {
        target: FACTORY_ADDRESS,
        call: [
          'getPair(address,address)(address)',
          tokenA.address,
          tokenB.address
        ],
        returns: [[pairAddress]]
      };
    });
    aggregate(calls, CONFIG[chainId ?? DEFAULT_CHAIN])
      .then((res: any) => {
        const pairAddresses = Object.keys(res.results.original).filter(
          (key) => {
            if (!isZero(res.results.original[key])) {
              return res.results.original[key];
            }
          }
        );
        setPairAddresses(pairAddresses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chainId, currencies]);
  return pairAddresses;
}

export function usePairReserves(pairAddresses: string[]) {
  const { chainId } = useActiveWeb3React();
  const [pairReserves, setPairReserves] = useState<{
    [key: string]: BigintIsh;
  }>({});
  const onPairReserves = useCallback((updates: IUpdate[]) => {
    setPairReserves((pairReserves) => {
      updates.forEach((update) => {
        pairReserves[update.type] = update.value;
      });
      return { ...pairReserves };
    });
  }, []);
  useEffect(() => {
    const calls = pairAddresses.map((pairAddress) => {
      return {
        target: pairAddress,
        call: ['getReserves()(uint112,uint112)'],
        returns: [[pairAddress + '_reserve0'], [pairAddress + '_reserve1']]
      };
    });

    const watcher = createWatcher(calls, CONFIG[chainId ?? DEFAULT_CHAIN]);

    watcher.batch().subscribe((updates) => {
      onPairReserves(updates);
    });

    watcher.start();
  }, [chainId, onPairReserves, pairAddresses]);
  return pairReserves;
}
