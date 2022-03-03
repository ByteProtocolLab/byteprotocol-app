import React from 'react';
import { hooks, walletLink } from '../../connectors/walletLink';
import { SUPPORTED_WALLETS } from '../../constants/wallets';
import Card from './Card';

const { useChainId, useError, useIsActivating, useIsActive } = hooks;

export default function WalletLinkCard() {
  const chainId = useChainId();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  return (
    <Card
      name={SUPPORTED_WALLETS.WalletLink.name}
      iconURL={SUPPORTED_WALLETS.WalletLink.iconURL}
      connector={walletLink}
      chainId={chainId}
      error={error}
      isActivating={isActivating}
      isActive={isActive}
    />
  );
}
