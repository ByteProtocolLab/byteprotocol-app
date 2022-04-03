import Home from '../pages/home';
import Dao from '../pages/dao';
import Proposal from '../pages/proposal';
import Vote from '../pages/vote';
import Swap from '../pages/swap';
import Supply from '../pages/supply';
import Pool from '../pages/pool';
import AddProposal from '../pages/addProposal';
import LimitOrder from '../pages/limitOrder';

interface router {
  path: string;
  component: any;
  exact?: boolean;
  children?: Array<router>;
}

const routers: Array<router> = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/swap',
        component: Swap
      },
      {
        path: '/supply/:inAddress/:outAddress',
        component: Supply
      },
      {
        path: '/pool',
        component: Pool
      },
      {
        path: '/dao',
        component: Dao
      },
      {
        path: '/proposal/:id',
        component: Proposal
      },
      {
        path: '/vote',
        component: Vote
      },
      {
        path: '/addProposal',
        component: AddProposal
      },
      {
        path: '/limitOrder',
        component: LimitOrder
      }
    ]
  }
];
export default routers;
