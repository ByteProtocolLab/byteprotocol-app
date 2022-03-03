import { useMemo, useState } from 'react';
import { isZero } from '../utils/common';
import { usePublicResolverContract } from './useContract';

export function useAddr(
  resolverAddress?: string,
  node?: string
): string | undefined {
  const [addr, setAddr] = useState<string>();
  const address = useMemo(() => {
    if (!resolverAddress || isZero(resolverAddress)) return undefined;
    return resolverAddress;
  }, [resolverAddress]);
  const publicResolverContract = usePublicResolverContract(address);
  useMemo(() => {
    publicResolverContract?.addr(node).then((res: any) => {
      setAddr(res);
    });
  }, [node, publicResolverContract]);
  return addr;
}

export function useName(
  resolverAddress?: string,
  node?: string
): string | undefined {
  const publicResolverContract = usePublicResolverContract(
    resolverAddress ? resolverAddress : ''
  );
  const [name, setName] = useState<string>();
  node &&
    publicResolverContract?.name(node).then((res: any) => {
      setName(res);
    });
  return name;
}
