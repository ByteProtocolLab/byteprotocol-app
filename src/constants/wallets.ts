import COINBASE_ICON_URL from '../assets/images/coinbaseWalletIcon.png';
import METAMASK_ICON_URL from '../assets/images/metamask.png';
import MAGIC_ICON_URL from '../assets/images/magic.svg';
import WALLETCONNECT_ICON_URL from '../assets/images/walletConnectIcon.svg';

export interface WalletInfo {
  name: string;
  iconURL: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  MetaMask: {
    name: 'MetaMask',
    iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WalletConnect: {
    name: 'WalletConnect',
    iconURL: WALLETCONNECT_ICON_URL,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WalletLink: {
    name: 'Coinbase',
    iconURL: COINBASE_ICON_URL,
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  Magic: {
    name: 'Magic',
    iconURL: MAGIC_ICON_URL,
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
};
