import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { DEFAULT_DEADLINE_FROM_NOW } from '../constants/misc';
import { useCurrentBlockTimestamp } from './useCurrentBlockTimestamp';

export default function useTransactionDeadline(): BigNumber | undefined {
  const blockTimestamp = useCurrentBlockTimestamp();
  return useMemo(() => {
    if (blockTimestamp) return blockTimestamp.add(DEFAULT_DEADLINE_FROM_NOW);
    return undefined;
  }, [blockTimestamp]);
}
