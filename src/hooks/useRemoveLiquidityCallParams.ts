import { useMemo, useState } from 'react';
import { getAmount, pairFor } from '../utils/libarary';
import useActiveWeb3React from './useActiveWeb3React';
import { aggregate } from '@makerdao/multicall';
import { BigNumber } from 'ethers';
import { CONFIG, DEFAULT_CHAIN } from '../constants/misc';
import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core';
import JSBI from 'jsbi';

export interface RedeemCallParam {
  currencyAmountA: CurrencyAmount<Currency>;
  currencyAmountB: CurrencyAmount<Currency>;
  liquidityAmount: CurrencyAmount<Currency>;
}

export function useRemoveLiquidityCallParams(
  currency0?: Currency,
  currency1?: Currency
) {
  const { account, chainId } = useActiveWeb3React();
  const [redeemCallParams, setRedeemCallParams] = useState<RedeemCallParam>();

  useMemo(() => {
    if (!account || !currency0 || !currency1) return;
    const pairAddress = pairFor(
      currency0.wrapped.address,
      currency1.wrapped.address
    );
    const calls = [
      {
        target: pairAddress,
        call: ['balanceOf(address)(uint256)', account],
        returns: [['liquidity']]
      },
      {
        target: currency0.wrapped.address,
        call: ['balanceOf(address)(uint256)', pairAddress],
        returns: [['balance0']]
      },
      {
        target: currency1.wrapped.address,
        call: ['balanceOf(address)(uint256)', pairAddress],
        returns: [['balance1']]
      },
      {
        target: pairAddress,
        call: ['totalSupply()(uint256)'],
        returns: [['totalSupply']]
      }
    ];
    aggregate(calls, CONFIG[chainId ?? DEFAULT_CHAIN])
      .then((res: any) => {
        const data = res.results.transformed;
        const liquidity: BigNumber = data['liquidity'];
        const balance0: BigNumber = data['balance0'];
        const balance1: BigNumber = data['balance1'];
        const totalSupply: BigNumber = data['totalSupply'];

        const { amount0, amount1 } = getAmount(
          JSBI.BigInt(liquidity.toHexString()),
          JSBI.BigInt(balance0.toHexString()),
          JSBI.BigInt(balance1.toHexString()),
          JSBI.BigInt(totalSupply.toHexString())
        );

        setRedeemCallParams({
          currencyAmountA: CurrencyAmount.fromRawAmount(currency0, amount0),
          currencyAmountB: CurrencyAmount.fromRawAmount(currency1, amount1),
          liquidityAmount: CurrencyAmount.fromRawAmount(
            new Token(
              chainId ?? DEFAULT_CHAIN,
              pairAddress,
              18,
              'UNI-V2',
              'UNISWAP V2'
            ),
            liquidity.toHexString()
          )
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [account, chainId, currency0, currency1]);

  return redeemCallParams;
}
