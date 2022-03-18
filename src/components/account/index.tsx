import React from 'react';
import copy from 'copy-to-clipboard';
import Identicon from '../identicon';
import Modal from '../modal';
import Avatar from '../avatar';
import { useIntl } from 'react-intl';
import style from './index.module.scss';
import { useCurrencyBalance } from '../../hooks/useCurrencyBalance';
import { SYSX_BSC, SYSX_CURRENCY } from '../../constants/tokens';
import { ChainId } from '../../connectors/chains';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';

export function AccountModal({
  account,
  onChange
}: {
  account: string;
  onChange: () => void;
}) {
  const intl = useIntl();
  const { chainId } = useActiveWeb3React();
  const sysxBalance = useCurrencyBalance(SYSX_CURRENCY[chainId ?? ChainId.BSC]);
  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <div className={style.main_header}>
          <p className={style.main_header_title}>Connected with Injected</p>
          <button
            type="button"
            className={style.main_header_btn}
            onClick={onChange}
          >
            Change
          </button>
        </div>
        <div className={style.main_content}>
          <Identicon account={account} />
          <p>{account}</p>
        </div>
        <div className={style.main_footer}>
          <button
            type="button"
            className={style.main_footer_btn}
            onClick={() => {
              copy(account);
            }}
          >
            <i
              className={[
                `${style.main_footer_btn_icon}`,
                `iconfont icon-block`
              ].join(' ')}
            />
            {intl.formatMessage({ id: 'copyAddress' })}
          </button>
          <a
            href={`https://etherscan.com/address/${account}`}
            className={style.main_footer_btn}
          >
            <i
              className={[
                `${style.main_footer_btn}`,
                `iconfont icon-select`
              ].join(' ')}
            />
            {intl.formatMessage({ id: 'viewEtherscan' })}
          </a>
        </div>
      </div>
      <div className={style.box}>
        <Avatar width={27} height={27} edge={15} address={account} />
        <div className={style.box_amount}>
          <span>SYSX</span>
          <span>{sysxBalance ?? '0.0'}</span>
        </div>
      </div>
      <div className={style.transaction}>
        <p>{intl.formatMessage({ id: 'transactionDetailsDescription' })}</p>
      </div>
    </div>
  );
}

export default function Account({
  account,
  visible,
  onCancel,
  onChange
}: {
  account: string;
  visible: boolean;
  onCancel: () => void;
  onChange: () => void;
}) {
  const intl = useIntl();
  return (
    <Modal
      title={intl.formatMessage({ id: 'account' })}
      visible={visible}
      onCancel={onCancel}
    >
      <AccountModal account={account} onChange={onChange} />
    </Modal>
  );
}
