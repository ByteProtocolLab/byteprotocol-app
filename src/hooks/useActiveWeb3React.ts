import { getPriorityConnector } from '@web3-react/core';
import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask';
import { hooks as networkHooks, network } from '../connectors/network';
import {
  hooks as walletConnectHooks,
  walletConnect
} from '../connectors/walletConnect';
import { hooks as walletLinkHooks, walletLink } from '../connectors/walletLink';

const {
  usePriorityConnector,
  useSelectedProvider,
  useSelectedWeb3React
} = getPriorityConnector(
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [walletLink, walletLinkHooks],
  [network, networkHooks]
);

export default function useActiveWeb3React() {
  const connector = usePriorityConnector();
  const provider = useSelectedProvider(connector);
  return useSelectedWeb3React(connector, provider);
}
