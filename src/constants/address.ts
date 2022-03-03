import { ChainId } from '../connectors/chains';
import { constructSameAddressMap } from '../utils/common';

type AddressMap = { [chainId: number]: string };

export const FACTORY_ADDRESS = '0x57a03d39a5a36CCa00535a949e0275Ac3dF75676';
export const INIT_CODE_HASH =
  '0xf9cf1506d4b786de2c1167231997883d16cae8f8b4a52553ec177429e1b90e3a';

export const GOVERNANCE_ADDRESSES =
  '0xc0Da02939E1441F497fd74F78cE7Decb17B66529';
export const ENS_REGISTRY_WITH_FALLBACK_ADDRESSES =
  '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
export const ARGENT_WALLET_DETECTOR_ADDRESS =
  '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8';

export const MULTICALL_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [ChainId.ROPSTEN]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [ChainId.RINKEBY]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [ChainId.GOERLI]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [ChainId.KOVAN]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  [ChainId.POLYGON]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  [ChainId.POLYGON_MUMBAI]: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
  [ChainId.BSC]: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c'
};

export const ROUTER_ADDRESS: AddressMap = constructSameAddressMap(
  '0x596464A3Db562cF9dBd8f059E26Deec6C2f2ae0B',
  [ChainId.BSC]
);
