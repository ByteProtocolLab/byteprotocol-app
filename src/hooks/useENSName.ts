import { getAddress, namehash } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { useENSAddress } from './useENSAddress';
import { useResolver } from './useENSRegistryWithFallback';
import { useName } from './usePublicResolver';

export function useENSName(address: string): string | undefined {
  const node = useMemo(() => {
    if (!address || !getAddress(address)) return undefined;
    return namehash(`${address.toLowerCase().substr(2)}.addr.reverse`);
  }, [address]);
  const resolverAddress = useResolver(node);
  const ensName = useName(resolverAddress, node);
  const fwdAddr = useENSAddress(ensName);
  const checkName = address === fwdAddr ? ensName : undefined;
  return checkName;
}
