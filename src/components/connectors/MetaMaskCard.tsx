import React from 'react';
import { hooks, metaMask } from '../../connectors/metaMask';
import { SUPPORTED_WALLETS } from '../../constants/wallets';
import Card from './Card';

const { useChainId, useError, useIsActivating, useIsActive } = hooks;

export default function MetaMaskCard() {
  const chainId = useChainId();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  return (
    <Card
      name={SUPPORTED_WALLETS.MetaMask.name}
      chainId={chainId}
      iconURL={SUPPORTED_WALLETS.MetaMask.iconURL}
      connector={metaMask}
      error={error}
      isActivating={isActivating}
      isActive={isActive}
    />
  );
}
