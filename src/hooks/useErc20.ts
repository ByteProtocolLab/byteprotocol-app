import { TransactionResponse } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import { useCallback, useMemo, useState } from 'react';
import { calculateGasMargin } from '../utils/common';
import useActiveWeb3React from './useActiveWeb3React';
import { useErc20Contract } from './useContract';

export function useDecimals(address: string) {
  const erc20Contract = useErc20Contract(address);
  const [decimals, setDecimals] = useState<number>();
  useMemo(() => {
    erc20Contract?.decimals().then((res: number) => {
      setDecimals(res);
    });
  }, [erc20Contract]);
  return decimals;
}

export function useSymbol(address: string) {
  const erc20Contract = useErc20Contract(address);
  const [symbol, setSymbol] = useState<string>();
  useMemo(() => {
    erc20Contract?.symbol().then((res: string) => {
      setSymbol(res);
    });
  }, [erc20Contract]);
  return symbol;
}

export function useName(address: string) {
  const erc20Contract = useErc20Contract(address);
  const [name, setName] = useState<string>();
  useMemo(() => {
    erc20Contract?.name().then((res: string) => {
      setName(res);
    });
  }, [erc20Contract]);
  return name;
}

export function useBalanceOf(address?: string): BigNumber | undefined {
  const { account } = useActiveWeb3React();
  const erc20Contract = useErc20Contract(address);
  const [balanceOf, setBalanceOf] = useState<BigNumber>();
  useMemo(() => {
    if (!account || !address) return;
    erc20Contract
      ?.balanceOf(account)
      .then((res: BigNumber) => {
        setBalanceOf(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [account, address, erc20Contract]);
  return balanceOf;
}

export function useAllowance(
  address?: string,
  owner?: string,
  spender?: string
): BigNumber | undefined {
  const erc20Contract = useErc20Contract(address);
  const [allowance, setAllowance] = useState<BigNumber>();
  useMemo(() => {
    if (!owner || !spender) return;
    erc20Contract
      ?.allowance(owner, spender)
      .then((res: BigNumber) => {
        setAllowance(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [erc20Contract, owner, spender]);
  return allowance;
}

export function useApprove(
  address?: string,
  spender?: string,
  value?: BigNumber
): () => Promise<TransactionResponse> {
  const erc20Contract = useErc20Contract(address);
  return useCallback(async (): Promise<TransactionResponse> => {
    const estimateGas = await erc20Contract?.estimateGas.approve(
      spender,
      value
    );
    return erc20Contract?.approve(spender, value, {
      gasLimit: estimateGas && calculateGasMargin(estimateGas)
    });
  }, [erc20Contract, spender, value]);
}
