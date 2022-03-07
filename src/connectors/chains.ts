import { AddEthereumChainParameter } from '@web3-react/types';
import ARBTTRUM_ICON_URL from '../assets/images/arbitrum.svg';
import POLYGON_ICON_URL from '../assets/images/polygon.svg';
import OPTIMISTIC_ICON_URL from '../assets/images/optimistic.svg';
import ETHEREUM_ICON_URL from '../assets/images/ethereum.png';
import BSC_ICON_URL from '../assets/images/bsc.svg';

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  BSC = 56,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,

  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001
}

export const SUPPORT_CHAINID = [ChainId.BSC];

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18
};

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18
};

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18
};

interface BasicChainInformation {
  urls: string[];
  name: string;
  iconURL?: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls
    };
  } else {
    return chainId;
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  [ChainId.MAINNET]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://mainnet.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : '',
      process.env.REACT_ALCHEMY_KEY
        ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_ALCHEMY_KEY}`
        : '',
      'https://cloudflare-eth.com'
    ].filter((url) => url !== undefined),
    name: 'Ethereum',
    iconURL: ETHEREUM_ICON_URL
  },
  [ChainId.ROPSTEN]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://ropsten.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : ''
    ].filter((url) => url !== undefined),
    name: 'Ropsten'
  },
  [ChainId.RINKEBY]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://rinkeby.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : ''
    ].filter((url) => url !== undefined),
    name: 'Rinkeby'
  },
  [ChainId.GOERLI]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://goerli.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : ''
    ].filter((url) => url !== undefined),
    name: 'GOERLI'
  },
  [ChainId.KOVAN]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://kovan.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : ''
    ].filter((url) => url !== undefined),
    name: 'Kovan'
  },
  // Optimism
  [ChainId.OPTIMISM]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://optimism-mainnet.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : '',
      'https://mainnet.optimism.io'
    ].filter((url) => url !== undefined),
    name: 'Optimistic',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
    iconURL: OPTIMISTIC_ICON_URL
  },
  [ChainId.OPTIMISTIC_KOVAN]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://optimism-kovan.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : '',
      'https://kovan.optimism.io'
    ].filter((url) => url !== undefined),
    name: 'Optimistic Kovan',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://kovan-optimistic.etherscan.io']
  },
  // Arbitrum
  [ChainId.ARBITRUM_ONE]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://arbitrum-mainnet.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : '',
      'https://arb1.arbitrum.io/rpc'
    ].filter((url) => url !== undefined),
    name: 'Arbitrum',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io'],
    iconURL: ARBTTRUM_ICON_URL
  },
  [ChainId.ARBITRUM_RINKEBY]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://arbitrum-rinkeby.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : '',
      'https://rinkeby.arbitrum.io/rpc'
    ].filter((url) => url !== undefined),
    name: 'Arbitrum Testnet',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://testnet.arbiscan.io']
  },
  // Polygon
  [ChainId.POLYGON]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://polygon-mainnet.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : '',
      'https://polygon-rpc.com'
    ].filter((url) => url !== undefined),
    name: 'Polygon',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
    iconURL: POLYGON_ICON_URL
  },
  [ChainId.POLYGON_MUMBAI]: {
    urls: [
      process.env.REACT_INFURA_KEY
        ? `https://polygon-mumbai.infura.io/v3/${process.env.REACT_INFURA_KEY}`
        : ''
    ].filter((url) => url !== undefined),
    name: 'Polygon Mumbai',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://mumbai.polygonscan.com']
  },
  // BSC
  [ChainId.BSC]: {
    urls: ['https://rpc.ankr.com/bsc'].filter((url) => url !== undefined),
    name: 'BSC',
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    iconURL: BSC_ICON_URL
  }
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
