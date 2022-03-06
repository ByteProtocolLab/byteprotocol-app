import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { createWatcher, IUpdate } from '@makerdao/multicall';
import { CONFIG, DEFAULT_CHAIN } from '../constants/misc';
import useActiveWeb3React from './useActiveWeb3React';

export function useCurrentBlockTimestamp(): BigNumber | undefined {
  const { chainId } = useActiveWeb3React();
  const [blockTimestamp, setBlockTimestamp] = useState<BigNumber>();
  const onBlockTimestamp = useCallback((update: IUpdate) => {
    setBlockTimestamp((blockTimestamp) => {
      blockTimestamp = update.value;
      return blockTimestamp;
    });
  }, []);
  useEffect(() => {
    const calls = [
      {
        call: ['getCurrentBlockTimestamp()(uint256)'],
        returns: [['CURRENT_BLOCK_TIMESTAMP']]
      }
    ];

    const watcher = createWatcher(calls, CONFIG[chainId ?? DEFAULT_CHAIN]);

    watcher.subscribe((update) => {
      onBlockTimestamp(update);
    });

    watcher.start();
  }, [chainId, onBlockTimestamp]);
  return blockTimestamp;
}
