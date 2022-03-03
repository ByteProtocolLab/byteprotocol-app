import { aggregate } from '@makerdao/multicall';
import { useMemo, useState } from 'react';
import { PRICE_FEEDS } from '../constants/feeds';
import { CONFIG } from '../constants/misc';
import { Currency } from '@uniswap/sdk-core';
import { ChainId } from '../connectors/chains';
import useActiveWeb3React from './useActiveWeb3React';

export function usePriceFeed(currencies: Currency[]) {
  const { chainId } = useActiveWeb3React();
  const [priceFeed, setPriceFeed] = useState<{ [key: string]: number }>({});
  useMemo(() => {
    const calls = currencies
      .filter((item) => {
        return PRICE_FEEDS[item.wrapped.address] !== undefined;
      })
      .map((item) => {
        return {
          target: PRICE_FEEDS[item.wrapped.address],
          call: ['latestAnswer()(uint256)'],
          returns: [[item.wrapped.address, (val: number) => val / 10 ** 8]]
        };
      });
    aggregate(calls, CONFIG[chainId ?? ChainId.MAINNET])
      .then((res: any) => {
        setPriceFeed(res.results.transformed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chainId, currencies]);
  return priceFeed;
}
