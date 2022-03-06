import { initializeConnector } from '@web3-react/core';
import { WalletLink } from '@web3-react/walletlink';
import { ChainId, URLS } from './chains';

export const [walletLink, hooks] = initializeConnector<WalletLink>(
  (actions) =>
    new WalletLink(actions, {
      url: URLS[ChainId.BSC][0],
      appName: 'web3-react'
    })
);
