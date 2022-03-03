import { useCallback, useEffect, useState } from 'react';
import useActiveWeb3React from './useActiveWeb3React';

export function useBlockNumber() {
  const { chainId, library } = useActiveWeb3React();
  const [state, setState] = useState<{ chainId?: number; block?: number }>({
    chainId
  });
  const onBlock = useCallback(
    (block: number) => {
      setState((state) => {
        if (state.chainId === chainId) {
          if (typeof state.block !== 'number') return { chainId, block };
          return { chainId, block: Math.max(block, state.block) };
        }
        return state;
      });
    },
    [chainId]
  );
  useEffect(() => {
    if (library && chainId) {
      setState({ chainId });
      library
        .getBlockNumber()
        .then(onBlock)
        .catch((error: any) => {
          console.error(
            `Failed to get block number for chainId ${chainId}`,
            error
          );
        });
      library.on('block', onBlock);
      return () => {
        library.removeListener('block', onBlock);
      };
    }
    return undefined;
  }, [chainId, library, onBlock]);
  return state.block;
}
