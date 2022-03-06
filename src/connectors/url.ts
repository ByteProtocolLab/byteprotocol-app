import { initializeConnector } from '@web3-react/core';
import { Url } from '@web3-react/url';
import { ChainId, URLS } from './chains';

export const [url, hooks] = initializeConnector<Url>(
  (actions) => new Url(actions, URLS[ChainId.BSC][0]),
  [1]
);
