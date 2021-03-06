export interface Menu {
  name: string;
  path: string;
  icon: string;
  children?: Menu[];
}

export const SUPPORTED_MENUS: { [key: string]: Menu } = {
  TRADE: {
    name: 'swap',
    path: '/swap/0x0/0x0',
    icon: 'iconfont icon-thunderbolt'
  },
  POOL: {
    name: 'pool',
    path: '/pool',
    icon: 'iconfont icon-transaction'
  },
  VOTE: {
    name: 'vote',
    path: '/dao',
    icon: 'iconfont icon-rocket'
  }
};
