export interface Menu {
  name: string;
  path: string;
  icon: string;
  children?: Menu[];
}

export const SUPPORTED_MENUS: { [key: string]: Menu } = {
  TRADE: {
    name: 'swap',
    path: '/',
    icon: 'iconfont icon-thunderbolt',
    children: [
      {
        name: 'swap',
        path: '/swap',
        icon: 'iconfont icon-thunderbolt'
      },
      {
        name: 'limitOrder',
        path: '/limitOrder',
        icon: 'iconfont icon-thunderbolt'
      }
    ]
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
