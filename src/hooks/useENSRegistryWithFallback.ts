import { useMemo, useState } from 'react';
import { useENSRegistryWithFallbackContract } from './useContract';

export function useResolver(node?: string): string | undefined {
  const [resolverAddress, setResolverAddress] = useState<string>();
  const contract = useENSRegistryWithFallbackContract();
  useMemo(() => {
    node &&
      contract?.resolver(node).then((res: string) => {
        setResolverAddress(res);
      });
  }, [contract, node]);
  return resolverAddress;
}
