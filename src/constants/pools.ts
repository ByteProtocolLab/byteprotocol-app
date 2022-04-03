import { ChainId } from '../connectors/chains';
import { Currency } from '@uniswap/sdk-core';
import { BUSD, DAI_BSC, ETH_BSC, NATIVE_CURRENCY, USDT_BSC } from './tokens';

type ChainCurrencyList = {
  readonly [chainId: number]: [Currency, Currency][];
};

export const EXTENDS_POOLS: ChainCurrencyList = {
  [ChainId.MAINNET]: [],
  [ChainId.ROPSTEN]: [],
  [ChainId.RINKEBY]: [],
  [ChainId.GOERLI]: [],
  [ChainId.KOVAN]: [],
  [ChainId.ARBITRUM_ONE]: [],
  [ChainId.ARBITRUM_RINKEBY]: [],
  [ChainId.OPTIMISM]: [],
  [ChainId.OPTIMISTIC_KOVAN]: [],
  [ChainId.POLYGON]: [],
  [ChainId.POLYGON_MUMBAI]: [],
  [ChainId.BSC]: [
    [NATIVE_CURRENCY[ChainId.BSC], DAI_BSC],
    [NATIVE_CURRENCY[ChainId.BSC], USDT_BSC],
    [NATIVE_CURRENCY[ChainId.BSC], ETH_BSC],
    [NATIVE_CURRENCY[ChainId.BSC], BUSD],
    [DAI_BSC, USDT_BSC],
    [DAI_BSC, ETH_BSC],
    [USDT_BSC, ETH_BSC]
  ]
};
