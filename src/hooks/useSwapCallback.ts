import { Trade } from '@uniswap/v2-sdk';
import { Percent, Currency, TradeType } from '@uniswap/sdk-core';
import useTransactionDeadline from './useTransactionDeadline';
import { useSwapCallArguments } from './useSwapCallParams';
import useSendSwapTransaction from './useSendSwapTransaction';
import { useENSAddress } from './useENSAddress';
import useActiveWeb3React from './useActiveWeb3React';

export default function useSwapCallback(
  allowedSlippage: Percent,
  trade?: Trade<Currency, Currency, TradeType>,
  recipientAddressOrName?: string
) {
  const { account, library } = useActiveWeb3React();
  const deadline = useTransactionDeadline();
  const recipient = useENSAddress(recipientAddressOrName);
  const calls = useSwapCallArguments(
    trade,
    allowedSlippage,
    deadline,
    recipient ?? account ?? undefined
  );
  return useSendSwapTransaction(account, library, calls);
}
