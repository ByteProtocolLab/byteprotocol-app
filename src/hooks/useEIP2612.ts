import { BigNumber } from 'ethers';
import { useMemo, useState } from 'react';
import { useEIP2612Contract } from './useContract';

export function useNonces(address?: string, account?: string) {
  const eip2612Contract = useEIP2612Contract(address);
  const [nonces, setNonces] = useState<BigNumber>();
  useMemo(() => {
    if (!account || !address) return;
    eip2612Contract?.nonces(account).then((res: BigNumber) => {
      setNonces(res);
    });
  }, [account, address, eip2612Contract]);
  return nonces;
}
