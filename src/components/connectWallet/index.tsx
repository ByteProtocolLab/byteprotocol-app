import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Modal from '../modal';
import MetaMaskCard from '../connectors/MetaMaskCard';
import WalletConnectCard from '../connectors/WalletConnectCard';
import WalletLinkCard from '../connectors/WalletLinkCard';
import MagicCard from '../connectors/MagicCard';
import style from './index.module.scss';

export default function ConnectWallet({
  visible,
  onCancel
}: {
  visible: boolean;
  onCancel: () => void;
}) {
  const intl = useIntl();
  const [checked, setChecked] = useState(false);

  return (
    <Modal
      title={intl.formatMessage({ id: 'connectWallet' })}
      visible={visible}
      onCancel={onCancel}
      overflowY
    >
      <div>
        <div className={style.wallet_header}>
          <span>Connect Wallet</span>
          <p>To start using SYSX</p>
        </div>
        <div className={style.wallet_service}>
          <input
            type="checkbox"
            checked={!checked}
            onChange={() => {
              setChecked(!checked);
            }}
          />
          <p>
            By connecting, I accept SYSX&apos;s
            <a> Terms of Service </a>
            and
            <a> Privacy Policy </a>
          </p>
        </div>
        <div className={style.wallet_box}>
          <span className={style.wallet_box_header}>
            <i>1</i>
            Choose Wallet
          </span>
          <div>
            <MetaMaskCard />
            <WalletConnectCard />
            <WalletLinkCard />
            <MagicCard />
          </div>
        </div>
      </div>
    </Modal>
  );
}
