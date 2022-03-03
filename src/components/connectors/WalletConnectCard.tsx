import React from 'react';
import { hooks, walletConnect } from '../../connectors/walletConnect';
import { SUPPORTED_WALLETS } from '../../constants/wallets';
import Card from './Card';

const { useChainId, useError, useIsActivating, useIsActive } = hooks;

export default function WalletConnectCard() {
  const chainId = useChainId();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  return (
    <Card
      name={SUPPORTED_WALLETS.WalletConnect.name}
      iconURL={SUPPORTED_WALLETS.WalletConnect.iconURL}
      connector={walletConnect}
      chainId={chainId}
      error={error}
      isActivating={isActivating}
      isActive={isActive}
    />
  );
}
