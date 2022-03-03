import { useMemo, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import useActiveWeb3React from './useActiveWeb3React';

export function useGasPrice(): number {
  const { library } = useActiveWeb3React();
  const [gasPrice, setGasPrice] = useState<BigNumber>(BigNumber.from(0));
  useMemo(() => {
    library?.getGasPrice().then((result) => {
      setGasPrice(result);
    });
  }, [library]);
  return parseInt(utils.formatUnits(gasPrice, 9));
}
