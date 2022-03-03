import { namehash } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { useResolver } from './useENSRegistryWithFallback';
import { useAddr } from './usePublicResolver';

export function useENSAddress(ensName?: string): string | undefined {
  const node = useMemo(() => {
    return ensName ? safeNamehash(ensName) : undefined;
  }, [ensName]);
  const resolverAddress = useResolver(node);
  return useAddr(resolverAddress, node);
}

export function safeNamehash(name?: string): string | undefined {
  if (name === undefined) return undefined;
  try {
    return namehash(name);
  } catch (error) {
    return undefined;
  }
}
