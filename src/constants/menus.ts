export interface Menu {
  name: string;
  path: string;
  icon: string;
}

export const SUPPORTED_MENUS: { [key: string]: Menu } = {
  SWAP: {
    name: 'swap',
    path: '/swap',
    icon: 'iconfont icon-thunderbolt'
  },
  POOL: {
    name: 'pool',
    path: '/pool',
    icon: 'iconfont icon-transaction'
  },
  LIMITORDER: {
    name: 'limitOrder',
    path: '/limitOrder',
    icon: 'iconfont icon-thunderbolt'
  },
  VOTE: {
    name: 'vote(BETA)',
    path: '/dao',
    icon: 'iconfont icon-rocket'
  }
};
