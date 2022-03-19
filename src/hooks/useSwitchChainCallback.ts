import { Magic } from '@web3-react/magic';
import { Network } from '@web3-react/network';
import { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import { useCallback } from 'react';
import { getAddChainParameters } from '../connectors/chains';

export function useSwitchChainCallback(
  chainId: number,
  connector: Connector,
  onChangeChainId: (desiredChainId: number) => void
) {
  return useCallback(
    async (desiredChainId: number) => {
      onChangeChainId(desiredChainId);
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return;
      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) return;

      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(
          desiredChainId === -1 ? undefined : desiredChainId
        );
      } else if (connector instanceof Magic) {
        await connector.activate({ email: '' });
      } else {
        await connector.activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId)
        );
      }
    },
    [onChangeChainId, chainId, connector]
  );
}
