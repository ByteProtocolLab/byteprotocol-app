import { MULTICALL_ADDRESS } from './address';
import { ChainId } from '../connectors/chains';
import { Percent, Fraction } from '@uniswap/sdk-core';
import JSBI from 'jsbi';

export const CONFIG: { [chainId: number]: any } = {
  [ChainId.MAINNET]: {
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_INFURA_KEY}`,
    multicallAddress: MULTICALL_ADDRESS[ChainId.MAINNET],
    interval: 15000
  },
  [ChainId.ROPSTEN]: {
    rpcUrl: `https://ropsten.infura.io/v3/${process.env.REACT_INFURA_KEY}`,
    multicallAddress: MULTICALL_ADDRESS[ChainId.ROPSTEN],
    interval: 15000
  },
  [ChainId.RINKEBY]: {
    rpcUrl: `https://rinkeby.infura.io/v3/${process.env.REACT_INFURA_KEY}`,
    multicallAddress: MULTICALL_ADDRESS[ChainId.RINKEBY],
    interval: 15000
  },
  [ChainId.GOERLI]: {
    rpcUrl: `https://goerli.infura.io/v3/${process.env.REACT_INFURA_KEY}`,
    multicallAddress: MULTICALL_ADDRESS[ChainId.GOERLI],
    interval: 15000
  },
  [ChainId.KOVAN]: {
    rpcUrl: `https://kovan.infura.io/v3/${process.env.REACT_INFURA_KEY}`,
    multicallAddress: MULTICALL_ADDRESS[ChainId.KOVAN],
    interval: 15000
  },
  [ChainId.POLYGON]: {
    rpcUrl: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_INFURA_KEY}`,
    multicallAddress: MULTICALL_ADDRESS[ChainId.POLYGON],
    interval: 15000
  },
  [ChainId.POLYGON_MUMBAI]: {
    rpcUrl: `https://polygon-mumbai.infura.io/v3/${process.env.REACT_INFURA_KEY}`,
    multicallAddress: MULTICALL_ADDRESS[ChainId.POLYGON_MUMBAI],
    interval: 15000
  },
  [ChainId.BSC]: {
    rpcUrl: `https://rpc.ankr.com/bsc`,
    multicallAddress: MULTICALL_ADDRESS[ChainId.BSC],
    interval: 15000
  }
};

export const DEFAULT_CHAIN = ChainId.BSC;

export const DEFAULT_CALL_GAS_REQUIRED = 1_000_000;

export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30;

export const MAX_VALUE =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const BIPS_BASE = JSBI.BigInt(10000);

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(
  JSBI.BigInt(50),
  BIPS_BASE
);

export const ZERO_PERCENT = new Percent('0');
export const ONE_HUNDRED_PERCENT = new Percent('1');

export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const ZERO_FRACTION = new Fraction(ZERO, ONE);
