import React from 'react';
import { hooks, magic } from '../../connectors/magic';
import { SUPPORTED_WALLETS } from '../../constants/wallets';
import Card from './Card';

const { useError, useIsActivating, useIsActive } = hooks;

export default function MagicCard() {
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  return (
    <Card
      name={SUPPORTED_WALLETS.Magic.name}
      iconURL={SUPPORTED_WALLETS.Magic.iconURL}
      connector={magic}
      error={error}
      isActivating={isActivating}
      isActive={isActive}
    />
  );
}
