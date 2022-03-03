import React from 'react';
import Loading from '../loading';
import { ConnectButton } from './ConnectButton';
import { Connector } from '@web3-react/types';
import style from './index.module.scss';

export default function Card({
  name,
  iconURL,
  connector,
  chainId,
  error,
  isActivating,
  isActive
}: {
  name: string;
  chainId?: number;
  iconURL: string;
  connector: Connector;
  error?: Error;
  isActivating: boolean;
  isActive: boolean;
}) {
  return (
    <div>
      <div className={style.connect}>
        <div className={style.connect_picture}>
          <img src={iconURL} className={style.connect_picture_pic} />
          <p className={style.connect_picture_name}>{name}</p>
          {error ? (
            <i
              className={[
                `${style.connect_picture_error}`,
                `iconfont icon-close`
              ].join(' ')}
            />
          ) : isActivating ? (
            <div className={style.connect_picture_loading}>
              <Loading />
            </div>
          ) : (
            isActive && <i className={style.connect_picture_icon} />
          )}
        </div>
        <ConnectButton
          connector={connector}
          chainId={chainId}
          isActivating={isActivating}
          isActive={isActive}
          error={error}
        />
      </div>
      {error && (
        <div className={style.error}>
          {error.name}:{error.message}
        </div>
      )}
    </div>
  );
}
