import { useMemo, useState } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { useArgentWalletDetectorContract } from './useContract';

export default function useIsArgentWallet(): boolean {
  const { account } = useActiveWeb3React();
  const contract = useArgentWalletDetectorContract();
  const [isArgentWallet, setIsArgentWallet] = useState<boolean>(false);
  useMemo(() => {
    contract?.isArgentWallet(account).then((res: boolean) => {
      setIsArgentWallet(res);
    });
  }, [account, contract]);
  return isArgentWallet;
}
