import React from 'react';
import { Web3ReactHooks } from '@web3-react/core';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { Magic } from '@web3-react/magic';
import { useState } from 'react';
import { getAddChainParameters } from '../../connectors/chains';
import style from './index.module.scss';
import { Connector } from '@web3-react/types';

export function ConnectButton({
  connector,
  chainId,
  isActivating,
  error,
  isActive
}: {
  connector: Connector;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  const [desiredChainId] = useState<number>(
    connector instanceof Network ? 1 : chainId ?? -1
  );

  if (error) {
    return (
      <button
        className={style.connect_button}
        onClick={() => {
          if (
            connector instanceof WalletConnect ||
            connector instanceof Network
          ) {
            connector.activate(
              desiredChainId === -1 ? undefined : desiredChainId
            );
          } else if (connector instanceof Magic) {
            connector.activate({ email: '' });
          } else {
            connector.activate(
              desiredChainId === -1
                ? undefined
                : getAddChainParameters(desiredChainId)
            );
          }
        }}
      >
        <i className="iconfont icon-redo" />
      </button>
    );
  } else if (isActive) {
    return (
      <button
        className={style.connect_button}
        onClick={() => connector.deactivate()}
      >
        <i className="iconfont icon-lock" />
      </button>
    );
  } else {
    return (
      <button
        className={style.connect_button}
        onClick={
          isActivating
            ? undefined
            : () => {
                if (
                  connector instanceof WalletConnect ||
                  connector instanceof Network
                ) {
                  connector.activate(
                    desiredChainId === -1 ? undefined : desiredChainId
                  );
                } else if (connector instanceof Magic) {
                  connector.activate({ email: '', showUI: true });
                } else {
                  connector.activate(
                    desiredChainId === -1
                      ? undefined
                      : getAddChainParameters(desiredChainId)
                  );
                }
              }
        }
        disabled={isActivating}
      >
        <i className="iconfont icon-api" />
      </button>
    );
  }
}
