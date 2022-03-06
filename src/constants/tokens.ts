import {
  Token,
  WETH9,
  Ether,
  Currency,
  NativeCurrency
} from '@uniswap/sdk-core';
import { ChainId } from '../connectors/chains';

// WETH
export const WETH_POLYGON = new Token(
  ChainId.POLYGON,
  '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  18,
  'WETH',
  'Wrapped Ether'
);
export const WETH_POLYGON_MUMBAI = new Token(
  ChainId.POLYGON_MUMBAI,
  '0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa',
  18,
  'WETH',
  'Wrapped Ether'
);
export const WETH_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  '0x4200000000000000000000000000000000000006',
  18,
  'WETH',
  'Wrapped Ether'
);
export const WETH_OPTIMISTIC_KOVAN = new Token(
  ChainId.OPTIMISTIC_KOVAN,
  '0x4200000000000000000000000000000000000006',
  18,
  'WETH',
  'Wrapped Ether'
);
export const WETH_ARBITRUM_ONE = new Token(
  ChainId.ARBITRUM_ONE,
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  18,
  'WETH',
  'Wrapped Ether'
);
export const WETH_ARBITRUM_RINKEBY = new Token(
  ChainId.ARBITRUM_RINKEBY,
  '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
  18,
  'WETH',
  'Wrapped Ether'
);
export const WETH_BSC = new Token(
  ChainId.BSC,
  '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
  18,
  'WETH',
  'Wrapped Ether'
);

// AMPL
export const AMPL = new Token(
  ChainId.MAINNET,
  '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
  9,
  'AMPL',
  'Ampleforth'
);

// DAI
export const DAI = new Token(
  ChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
);
export const DAI_ARBITRUM_ONE = new Token(
  ChainId.ARBITRUM_ONE,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai stable coin'
);
export const DAI_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai stable coin'
);
export const DAI_POLYGON = new Token(
  ChainId.POLYGON,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  18,
  'DAI',
  'Dai Stablecoin'
);
export const DAI_BSC = new Token(
  ChainId.MAINNET,
  '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
  18,
  'DAI',
  'Dai Stablecoin'
);
// USDC
export const USDC = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin'
);
export const USDC_ARBITRUM = new Token(
  ChainId.ARBITRUM_ONE,
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  6,
  'USDC',
  'USD//C'
);
export const USDC_POLYGON = new Token(
  ChainId.POLYGON,
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  6,
  'USDC',
  'USD//C'
);
export const USDC_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  6,
  'USDC',
  'USD//C'
);
// USDT
export const USDT = new Token(
  ChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD'
);
export const USDT_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  6,
  'USDT',
  'Tether USD'
);
export const USDT_ARBITRUM_ONE = new Token(
  ChainId.ARBITRUM_ONE,
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  6,
  'USDT',
  'Tether USD'
);
export const USDT_POLYGON = new Token(
  ChainId.POLYGON,
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  6,
  'USDT',
  'Tether USD'
);
export const USDT_BSC = new Token(
  ChainId.MAINNET,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD'
);
// WBTC
export const WBTC = new Token(
  ChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
);
export const WBTC_OPTIMISM = new Token(
  ChainId.OPTIMISM,
  '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
  8,
  'WBTC',
  'Wrapped BTC'
);
export const WBTC_ARBITRUM_ONE = new Token(
  ChainId.ARBITRUM_ONE,
  '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  8,
  'WBTC',
  'Wrapped BTC'
);
export const WBTC_POLYGON = new Token(
  ChainId.POLYGON,
  '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
  8,
  'WBTC',
  'Wrapped BTC'
);
export const FEI = new Token(
  ChainId.MAINNET,
  '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
  18,
  'FEI',
  'Fei USD'
);
export const TRIBE = new Token(
  ChainId.MAINNET,
  '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
  18,
  'TRIBE',
  'Tribe'
);
export const FRAX = new Token(
  ChainId.MAINNET,
  '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  18,
  'FRAX',
  'Frax'
);
export const FXS = new Token(
  ChainId.MAINNET,
  '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
  18,
  'FXS',
  'Frax Share'
);
export const REN_BTC = new Token(
  ChainId.MAINNET,
  '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
  8,
  'renBTC',
  'renBTC'
);
export const UMA = new Token(
  ChainId.MAINNET,
  '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828',
  18,
  'UMA',
  'UMA Voting Token v1'
);
export const ETH2X_FLI = new Token(
  ChainId.MAINNET,
  '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
  18,
  'ETH2x-FLI',
  'ETH 2x Flexible Leverage Index'
);
// Mirror Protocol compat.
export const UST = new Token(
  ChainId.MAINNET,
  '0xa47c8bf37f92abed4a126bda807a7b7498661acd',
  18,
  'UST',
  'Wrapped UST'
);
export const MIR = new Token(
  ChainId.MAINNET,
  '0x09a3ecafa817268f77be1283176b946c4ff2e608',
  18,
  'MIR',
  'Wrapped MIR'
);
export const BUSD = new Token(
  ChainId.MAINNET,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance USD'
);
export const BTCB = new Token(
  ChainId.MAINNET,
  '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  18,
  'BTCB',
  'Binance BTC'
);

// WMATIC
export const WMATIC = new Token(
  ChainId.POLYGON,
  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  18,
  'WMATIC',
  'Wrapped MATIC'
);

export const WMATIC_MUMBAI = new Token(
  ChainId.POLYGON_MUMBAI,
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
  18,
  'WMATIC',
  'Wrapped MATIC'
);

// WBNB
export const WBNB = new Token(
  ChainId.BSC,
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  18,
  'WBNB',
  'Wrapped BNB'
);

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token } = {
  ...WETH9,
  [ChainId.OPTIMISM]: WETH_OPTIMISM,
  [ChainId.OPTIMISTIC_KOVAN]: WETH_OPTIMISTIC_KOVAN,
  [ChainId.ARBITRUM_ONE]: WETH_ARBITRUM_ONE,
  [ChainId.ARBITRUM_RINKEBY]: WETH_ARBITRUM_RINKEBY,
  [ChainId.POLYGON]: WMATIC,
  [ChainId.POLYGON_MUMBAI]: WMATIC,
  [ChainId.BSC]: WBNB
};

class Matic extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (
      this.chainId !== ChainId.POLYGON_MUMBAI &&
      this.chainId !== ChainId.POLYGON
    )
      throw new Error('Not matic');
    return WRAPPED_NATIVE_CURRENCY[this.chainId];
  }

  public constructor(chainId: number) {
    if (chainId !== ChainId.POLYGON_MUMBAI && chainId !== ChainId.POLYGON)
      throw new Error('Not matic');
    super(chainId, 18, 'MATIC', 'Polygon Matic');
  }
}

class BNB extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (this.chainId !== ChainId.BSC) throw new Error('Not BSC');
    return WRAPPED_NATIVE_CURRENCY[this.chainId];
  }

  public constructor(chainId: number) {
    if (chainId !== ChainId.BSC) throw new Error('Not BSC');
    super(chainId, 18, 'BNB', 'BNB');
  }
}

export const NATIVE_CURRENCY: { [chainId: number]: Currency } = {
  [ChainId.MAINNET]: Ether.onChain(ChainId.MAINNET),
  [ChainId.ROPSTEN]: Ether.onChain(ChainId.ROPSTEN),
  [ChainId.RINKEBY]: Ether.onChain(ChainId.RINKEBY),
  [ChainId.GOERLI]: Ether.onChain(ChainId.GOERLI),
  [ChainId.KOVAN]: Ether.onChain(ChainId.KOVAN),

  [ChainId.OPTIMISM]: Ether.onChain(ChainId.OPTIMISM),
  [ChainId.OPTIMISTIC_KOVAN]: Ether.onChain(ChainId.OPTIMISM),
  [ChainId.ARBITRUM_ONE]: Ether.onChain(ChainId.ARBITRUM_ONE),
  [ChainId.ARBITRUM_RINKEBY]: Ether.onChain(ChainId.ARBITRUM_RINKEBY),
  [ChainId.POLYGON]: new Matic(ChainId.POLYGON),
  [ChainId.POLYGON_MUMBAI]: new Matic(ChainId.POLYGON_MUMBAI),

  [ChainId.BSC]: new BNB(ChainId.BSC)
};
