import { WETH9 } from '@uniswap/sdk-core';
import { ChainId } from '../connectors/chains';
import {
  AMPL,
  DAI,
  FEI,
  FRAX,
  FXS,
  MIR,
  REN_BTC,
  TRIBE,
  USDC,
  USDT,
  UST,
  WBTC
} from './tokens';

export const PRICE_FEEDS: { [key: string]: string } = {
  [WETH9[ChainId.MAINNET].address]:
    '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
  [AMPL.address]: '0xe20ca8d7546932360e37e9d72c1a47334af57706',
  [DAI.address]: '0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9',
  [USDC.address]: '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6',
  [USDT.address]: '0x3e7d1eab13ad0104d2750b8863b489d65364e32d',
  [WBTC.address]: '0xf4030086522a5beea4988f8ca5b36dbc97bee88c',
  [REN_BTC.address]: '0xf4030086522a5beea4988f8ca5b36dbc97bee88c',
  [TRIBE.address]: '0x84a24deca415acc0c395872a9e6a63e27d6225c8',
  [FRAX.address]: '0xb9e1e3a9feff48998e45fa90847ed4d467e8bcfd',
  [FXS.address]: '0x6ebc52c8c1089be9eb3945c4350b68b8e4c2233f',
  [MIR.address]: '0x97e4f2bc7231f2afa05c51f524a80e1c8bf944e5',
  [UST.address]: '0x8b6d9085f310396c6e4f0012783e9f850eaa8a82',
  [FEI.address]: '0x31e0a88fecb6ec0a411dbe0e9e76391498296ee9'
};
