import React, { useState } from 'react';
import GlobalSettings from '../../components/globalSettings';
import Account from '../account';
import Avatar from '../avatar';
import BlockNumber from '../blockNumber';
import Source from '../source';
import ConnectWallet from '../connectWallet';
import Menus from '../menus';
import { useIntl } from 'react-intl';
import { useCurrencyBalance } from '../../hooks/useCurrencyBalance';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { NetworksSelect } from '../connectors/NetworksSelect';
import { NATIVE_CURRENCY } from '../../constants/tokens';
import { DEFAULT_CHAIN } from '../../constants/misc';
import style from './index.module.scss';
import { ChainId } from '../../connectors/chains';

const ConnectBox = ({ onOpen }: { onOpen: () => void }) => {
  const intl = useIntl();
  return (
    <div className={style.right_label} onClick={onOpen}>
      <i className="iconfont icon-api" />
      {intl.formatMessage({ id: 'connectWallet' })}
    </div>
  );
};

const AccountBox = ({
  account,
  chainId,
  onOpen
}: {
  account: string;
  chainId?: number;
  onOpen: () => void;
}) => {
  const balance = useCurrencyBalance(NATIVE_CURRENCY[chainId ?? DEFAULT_CHAIN]);
  return (
    <div className={style.right_account} onClick={onOpen}>
      <Avatar width={27} height={27} edge={15} address={account} />
      <p className={style.right_account_value}>
        {`${balance?.toSignificant(6) ?? ''} 
        ${NATIVE_CURRENCY[chainId ?? ChainId.BSC].symbol}`}
      </p>
      <span>{account}</span>
    </div>
  );
};

export default function Header() {
  const { connector, chainId, error, active, account } = useActiveWeb3React();
  const [accountVisible, setAccountVisible] = useState(false);
  const [connectVisible, setConnectVisible] = useState(false);

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.left}>
          <div className={style.left_logo} />
          <div className={style.left_middle}>
            <Menus initIndex={0} />
          </div>
        </div>
        <div className={style.right}>
          <NetworksSelect
            connector={connector}
            chainId={chainId}
            error={error}
            isActivating={false}
            isActive={active}
          />
          {account ? (
            <AccountBox
              account={account}
              chainId={chainId}
              onOpen={() => {
                setAccountVisible(true);
              }}
            />
          ) : (
            <ConnectBox
              onOpen={() => {
                setConnectVisible(true);
              }}
            />
          )}
          <GlobalSettings />
          <Source />
        </div>
      </div>
      <Account
        visible={accountVisible}
        onCancel={() => {
          setAccountVisible(false);
        }}
        onChange={() => {
          setAccountVisible(false);
          setConnectVisible(true);
        }}
        account={account ? account : ''}
      />
      <ConnectWallet
        visible={connectVisible}
        onCancel={() => {
          setConnectVisible(false);
        }}
      />
      <BlockNumber />
    </div>
  );
}
