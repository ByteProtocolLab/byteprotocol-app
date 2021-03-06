import React, { useEffect } from 'react';
import { Web3ReactHooks } from '@web3-react/core';
import { Network } from '@web3-react/network';
import { useState } from 'react';
import {
  ChainId,
  CHAINS,
  SUPPORT_CHAINID,
  URLS
} from '../../connectors/chains';
import { Connector } from '@web3-react/types';
import style from './index.module.scss';
import { useSwitchChainCallback } from '../../hooks/useSwitchChainCallback';

function NetworkSelect({
  chainId,
  chainIds,
  error,
  switchChain
}: {
  chainId?: number;
  chainIds: number[];
  error?: Error;
  switchChain?: (chainId: number) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={style.select}
      onClick={() => {
        setVisible(!visible);
      }}
    >
      <div className={style.select_value}>
        <div className={style.box}>
          <i
            className={style.icon}
            style={{
              backgroundImage: chainId
                ? `url(${CHAINS[chainId]?.iconURL})`
                : undefined
            }}
          />
          <span className={style.name}>
            {chainId && chainId !== -1 ? CHAINS[chainId]?.name : 'Default'}
          </span>
        </div>
        <i className="iconfont icon-down" />
      </div>
      {visible && (
        <div className={style.select_main}>
          <span className={style.title}>Select Network</span>
          <div className={style.options}>
            {chainIds.map((id) => (
              <div
                className={style.option}
                key={id}
                onClick={() => {
                  switchChain && switchChain(id);
                }}
              >
                <div className={style.box}>
                  <div className={style.left}>
                    <i
                      className={style.icon}
                      style={{
                        backgroundImage: `url(${CHAINS[id]?.iconURL})`
                      }}
                    />
                    <span className={style.name}>
                      {CHAINS[id]?.name ?? chainId}
                    </span>
                  </div>
                  {chainId === id && <i className={style.dot} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className={style.select_error}>
          <div className={style.select_error_message}>
            {error.name}:{error.message}
          </div>
        </div>
      )}
    </div>
  );
}

export function NetworksSelect({
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
  const isNetwork = connector instanceof Network;
  const chainIds = (isNetwork
    ? Object.keys(URLS)
    : SUPPORT_CHAINID
  ).map((chainId) => Number(chainId));

  const [desiredChainId, setDesiredChainId] = useState<number>(
    isNetwork ? ChainId.BSC : -1
  );

  const switchChain = useSwitchChainCallback(
    desiredChainId,
    connector,
    setDesiredChainId
  );

  useEffect(() => {
    switchChain(ChainId.BSC);
  }, [switchChain]);

  if (error) {
    return (
      <NetworkSelect
        chainId={desiredChainId}
        switchChain={switchChain}
        error={error}
        chainIds={chainIds}
      />
    );
  } else if (isActive) {
    return (
      <NetworkSelect
        chainId={desiredChainId === -1 ? -1 : chainId}
        switchChain={switchChain}
        chainIds={chainIds}
      />
    );
  } else {
    return (
      <NetworkSelect
        chainId={desiredChainId}
        switchChain={isActivating ? undefined : switchChain}
        chainIds={chainIds}
      />
    );
  }
}
