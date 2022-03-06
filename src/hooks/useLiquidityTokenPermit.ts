import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { ROUTER_ADDRESS } from '../constants/address';
import { DEFAULT_CHAIN } from '../constants/misc';
import useActiveWeb3React from './useActiveWeb3React';
import { useNonces } from './useEIP2612';
import { PermitDomain, PermitMessage, useErc20Permit } from './useErc20Permit';
import useTransactionDeadline from './useTransactionDeadline';

const PERMIT_VALIDITY_BUFFER = 20 * 60;
const PERMIT_VERSION = '1';
const PERMIT_NAME = 'Uniswap V2';

export function useLiquidityTokenPermit(
  pairAddress?: string,
  value?: BigNumber
) {
  const { account, chainId } = useActiveWeb3React();
  const deadline = useTransactionDeadline();
  const nonces = useNonces(pairAddress, account ?? undefined);
  const { message, domain } = useMemo(() => {
    if (!account || !deadline || !chainId || !nonces || !value || !pairAddress)
      return { message: undefined, domain: undefined };

    const message: PermitMessage = {
      owner: account,
      spender: ROUTER_ADDRESS[chainId ?? DEFAULT_CHAIN],
      value: value.toString(),
      nonce: nonces.toNumber(),
      deadline: deadline.toNumber() + PERMIT_VALIDITY_BUFFER
    };

    const domain: PermitDomain = {
      version: PERMIT_VERSION,
      name: PERMIT_NAME,
      chainId: chainId,
      verifyingContract: pairAddress
    };

    return { message, domain };
  }, [account, chainId, deadline, nonces, pairAddress, value]);
  return useErc20Permit({ message, domain });
}
