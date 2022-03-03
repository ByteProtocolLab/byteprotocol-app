import { Currency, Percent, TradeType } from '@uniswap/sdk-core';
import { Trade, Router } from '@uniswap/v2-sdk';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { ChainId } from '../connectors/chains';
import useActiveWeb3React from './useActiveWeb3React';
import { useRouterContract } from './useContract';

export function useSwapCallArguments(
  trade:
    | Trade<Currency, Currency, TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT>
    | undefined,
  allowedSlippage: Percent,
  deadline: BigNumber | undefined,
  recipient?: string | undefined
) {
  const { chainId } = useActiveWeb3React();
  const routerContract = useRouterContract(chainId ?? ChainId.MAINNET);
  return useMemo(() => {
    if (routerContract && trade && allowedSlippage && recipient && deadline) {
      const calls = [];

      calls.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: false,
          allowedSlippage,
          recipient,
          deadline: deadline.toNumber()
        })
      );

      if (trade.tradeType === TradeType.EXACT_INPUT) {
        calls.push(
          Router.swapCallParameters(trade, {
            feeOnTransfer: true,
            allowedSlippage,
            recipient,
            deadline: deadline.toNumber()
          })
        );
      }
      return calls.map(({ methodName, args, value }) => {
        return {
          address: routerContract.address,
          calldata: routerContract.interface.encodeFunctionData(
            methodName,
            args
          ),
          value
        };
      });
    }
    return [];
  }, [allowedSlippage, deadline, recipient, routerContract, trade]);
}
