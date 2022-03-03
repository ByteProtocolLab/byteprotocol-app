import { useMemo } from 'react';
import { Contract } from 'ethers';
import ROUTER_ABI from '../abis/router.json';
import ERC_20_ABI from '../abis/erc20.json';
import PAIR_ABI from '../abis/pair.json';
import FACTORY_ABI from '../abis/factory.json';
import GOVERNOR_BRAVO_DELEGATOR_ABI from '../abis/governorBravoDelegator.json';
import ENS_REGISTRY_WITH_FALLBACK_ABI from '../abis/ensRegistryWithFallback.json';
import PUBLIC_RESOLVER_ABI from '../abis/publicResolver.json';
import ARGENT_WALLET_DETECTOR_ABI from '../abis/argentWalletDetector.json';
import EIP_2612_ABI from '../abis/eip_2612.json';
import WRAPPED_TOKEN_ABI from '../abis/wrappedToken.json';
import {
  ARGENT_WALLET_DETECTOR_ADDRESS,
  ENS_REGISTRY_WITH_FALLBACK_ADDRESSES,
  FACTORY_ADDRESS,
  GOVERNANCE_ADDRESSES,
  ROUTER_ADDRESS
} from '../constants/address';
import { getContract } from '../utils/web3';
import useActiveWeb3React from './useActiveWeb3React';
import { ChainId } from '../connectors/chains';

export function useContract(abi?: any, address?: string): Contract | null {
  const { library, account, chainId } = useActiveWeb3React();
  return useMemo(() => {
    if (!abi || !library || !chainId || !address) {
      return null;
    }
    return getContract(address, abi, library, account ? account : undefined);
  }, [library, chainId, account, address, abi]);
}

export function useRouterContract(chainId: ChainId) {
  return useContract(ROUTER_ABI, ROUTER_ADDRESS[chainId]);
}

export function useFactoryContract() {
  return useContract(FACTORY_ABI, FACTORY_ADDRESS);
}

export function usePairContract(contractAddress: string) {
  return useContract(PAIR_ABI, contractAddress);
}

export function useErc20Contract(contractAddress?: string) {
  return useContract(ERC_20_ABI, contractAddress);
}

export function useGovernorBravoDelegatorContract() {
  return useContract(GOVERNOR_BRAVO_DELEGATOR_ABI, GOVERNANCE_ADDRESSES);
}

export function usePublicResolverContract(address?: string) {
  return useContract(PUBLIC_RESOLVER_ABI, address);
}

export function useENSRegistryWithFallbackContract() {
  return useContract(
    ENS_REGISTRY_WITH_FALLBACK_ABI,
    ENS_REGISTRY_WITH_FALLBACK_ADDRESSES
  );
}

export function useArgentWalletDetectorContract() {
  return useContract(
    ARGENT_WALLET_DETECTOR_ABI,
    ARGENT_WALLET_DETECTOR_ADDRESS
  );
}

export function useEIP2612Contract(address?: string): Contract | null {
  return useContract(EIP_2612_ABI, address);
}

export function useWrappedTokenContract(address?: string): Contract | null {
  return useContract(WRAPPED_TOKEN_ABI, address);
}
