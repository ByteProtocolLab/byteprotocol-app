import { aggregate, createWatcher, IUpdate } from '@makerdao/multicall';
import { BigNumber } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CONFIG, DEFAULT_CHAIN } from '../constants/misc';
import useActiveWeb3React from './useActiveWeb3React';

export function useTotalSupply(pairAddress?: string): BigNumber | undefined {
  const { chainId } = useActiveWeb3React();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const onReserves = useCallback((update: IUpdate) => {
    setTotalSupply((totalSupply: any) => {
      totalSupply = update.value;
      return totalSupply;
    });
  }, []);
  useEffect(() => {
    if (!pairAddress) return undefined;
    const calls = [
      {
        target: pairAddress,
        call: ['totalSupply()(uint256)'],
        returns: [[pairAddress + '_totalSupply']]
      }
    ];
    const watcher = createWatcher(calls, CONFIG[chainId ?? DEFAULT_CHAIN]);
    watcher.subscribe((update) => {
      onReserves(update);
    });
    watcher.start();
  }, [chainId, onReserves, pairAddress]);
  return totalSupply;
}

export function useGetReserves(
  pairAddress?: string
): { [key: string]: BigNumber } | undefined {
  const { chainId } = useActiveWeb3React();
  const [reserves, setReserves] = useState<{ [key: string]: BigNumber }>();
  const onReserves = useCallback((updates: IUpdate[]) => {
    setReserves((reserves: any) => {
      if (!reserves) reserves = {};
      updates.forEach((update) => {
        reserves[update.type] = update.value;
      });
      return { ...reserves };
    });
  }, []);
  useEffect(() => {
    if (!pairAddress) return;
    const calls = [
      {
        target: pairAddress,
        call: ['getReserves()(uint112,uint112)'],
        returns: [[pairAddress + '_reserve0'], [pairAddress + '_reserve1']]
      }
    ];
    const watcher = createWatcher(calls, CONFIG[chainId ?? DEFAULT_CHAIN]);
    watcher.batch().subscribe((updates) => {
      onReserves(updates);
    });
    watcher.start();
  }, [chainId, onReserves, pairAddress]);
  return reserves;
}

export function usePairsInfo(
  pairAddresses: string[]
): { [key: string]: BigNumber } | undefined {
  const { chainId } = useActiveWeb3React();
  const [pairs, setPairs] = useState<{ [key: string]: BigNumber }>();
  useMemo(() => {
    const calls = pairAddresses.map((pairAddress) => {
      return {
        target: pairAddress,
        call: ['getReserves()(uint112,uint112)'],
        returns: [[pairAddress + '_reserve0'], [pairAddress + '_reserve1']]
      };
    });
    aggregate(calls, CONFIG[chainId ?? DEFAULT_CHAIN])
      .then((res: any) => {
        setPairs(res.results.transformed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chainId, pairAddresses]);
  return pairs;
}
