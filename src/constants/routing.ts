import { Currency, Token, WETH9 } from '@uniswap/sdk-core';
import { ChainId } from '../connectors/chains';
import {
  AMPL,
  DAI,
  USDC,
  USDT,
  WBTC,
  FEI,
  TRIBE,
  FRAX,
  FXS,
  REN_BTC,
  UMA,
  UST,
  MIR,
  NATIVE_CURRENCY,
  WRAPPED_NATIVE_CURRENCY,
  DAI_ARBITRUM_ONE,
  USDC_ARBITRUM,
  USDT_ARBITRUM_ONE,
  WBTC_ARBITRUM_ONE,
  DAI_OPTIMISM,
  USDC_OPTIMISM,
  USDT_OPTIMISM,
  WBTC_OPTIMISM,
  WETH_POLYGON,
  USDC_POLYGON,
  USDT_POLYGON,
  DAI_POLYGON,
  WBTC_POLYGON,
  WETH_POLYGON_MUMBAI,
  BUSD,
  BTCB,
  USDT_BSC,
  DAI_BSC,
  WBNB,
  ETH_BSC
} from './tokens';

type ChainTokenList = {
  readonly [chainId: number]: Token[];
};

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[];
};

export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: [WETH9[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [ChainId.BSC]: [WBNB, DAI_BSC, BUSD, BTCB, USDT_BSC]
};

export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] };
} = {
  [ChainId.MAINNET]: {
    [FEI.address]: [TRIBE],
    [TRIBE.address]: [FEI],
    [FRAX.address]: [FXS],
    [FXS.address]: [FRAX],
    [WBTC.address]: [REN_BTC],
    [REN_BTC.address]: [WBTC]
  }
};

export const COMMON_BASES: ChainCurrencyList = {
  [ChainId.MAINNET]: [
    NATIVE_CURRENCY[ChainId.MAINNET],
    WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET],
    DAI,
    USDC,
    USDT,
    WBTC
  ],
  [ChainId.ROPSTEN]: [
    NATIVE_CURRENCY[ChainId.ROPSTEN],
    WRAPPED_NATIVE_CURRENCY[ChainId.ROPSTEN]
  ],
  [ChainId.RINKEBY]: [
    NATIVE_CURRENCY[ChainId.RINKEBY],
    WRAPPED_NATIVE_CURRENCY[ChainId.RINKEBY]
  ],
  [ChainId.GOERLI]: [
    NATIVE_CURRENCY[ChainId.GOERLI],
    WRAPPED_NATIVE_CURRENCY[ChainId.GOERLI]
  ],
  [ChainId.KOVAN]: [
    NATIVE_CURRENCY[ChainId.KOVAN],
    WRAPPED_NATIVE_CURRENCY[ChainId.KOVAN]
  ],
  [ChainId.ARBITRUM_ONE]: [
    NATIVE_CURRENCY[ChainId.ARBITRUM_ONE],
    WRAPPED_NATIVE_CURRENCY[ChainId.ARBITRUM_ONE],
    DAI_ARBITRUM_ONE,
    USDC_ARBITRUM,
    USDT_ARBITRUM_ONE,
    WBTC_ARBITRUM_ONE
  ],
  [ChainId.ARBITRUM_RINKEBY]: [
    NATIVE_CURRENCY[ChainId.ARBITRUM_RINKEBY],
    WRAPPED_NATIVE_CURRENCY[ChainId.ARBITRUM_RINKEBY]
  ],
  [ChainId.OPTIMISM]: [
    NATIVE_CURRENCY[ChainId.OPTIMISM],
    DAI_OPTIMISM,
    USDC_OPTIMISM,
    USDT_OPTIMISM,
    WBTC_OPTIMISM
  ],
  [ChainId.OPTIMISTIC_KOVAN]: [NATIVE_CURRENCY[ChainId.OPTIMISTIC_KOVAN]],
  [ChainId.POLYGON]: [
    NATIVE_CURRENCY[ChainId.POLYGON],
    WRAPPED_NATIVE_CURRENCY[ChainId.POLYGON],
    WETH_POLYGON,
    USDC_POLYGON,
    DAI_POLYGON,
    USDT_POLYGON,
    WBTC_POLYGON
  ],
  [ChainId.POLYGON_MUMBAI]: [
    NATIVE_CURRENCY[ChainId.POLYGON_MUMBAI],
    WRAPPED_NATIVE_CURRENCY[ChainId.POLYGON_MUMBAI],
    WETH_POLYGON_MUMBAI
  ],
  [ChainId.BSC]: [
    NATIVE_CURRENCY[ChainId.BSC],
    WRAPPED_NATIVE_CURRENCY[ChainId.BSC],
    USDT_BSC,
    ETH_BSC,
    DAI_BSC,
    BUSD,
    BTCB
  ]
};

export const EXTENDS_TOKENS: ChainCurrencyList = {
  [ChainId.MAINNET]: [
    AMPL,
    DAI,
    USDC,
    USDT,
    WBTC,
    FEI,
    TRIBE,
    FRAX,
    FXS,
    REN_BTC,
    UMA,
    UST,
    MIR
  ],
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
  [ChainId.BSC]: [ETH_BSC, DAI_BSC, BUSD, BTCB, USDT_BSC]
};
