import { useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { CONFIG, DEFAULT_CHAIN } from '../constants/misc';
import { EXTENDS_TOKENS } from '../constants/routing';
import { Currency, Token } from '@uniswap/sdk-core';
import account from '../components/account';
import { aggregate } from '@makerdao/multicall';
import useActiveWeb3React from './useActiveWeb3React';

export function useSearch(addressWithSymbol: string): Currency[] {
  const { chainId } = useActiveWeb3React();
  const [currencies, setCurrencies] = useState<Currency[]>(
    EXTENDS_TOKENS[chainId ?? DEFAULT_CHAIN]
  );
  useMemo(() => {
    const regexp = new RegExp('^(0x[a-fA-F0-9]{40})$');
    if (addressWithSymbol && regexp.test(addressWithSymbol) && account) {
      const calls = [
        {
          target: addressWithSymbol,
          call: ['decimals()(uint256)'],
          returns: [['decimals', (val: BigNumber) => val.toNumber()]]
        },
        {
          target: addressWithSymbol,
          call: ['symbol()(string)'],
          returns: [['symbol']]
        },
        {
          target: addressWithSymbol,
          call: ['name()(string)'],
          returns: [['name']]
        }
      ];
      aggregate(calls, CONFIG[chainId ?? DEFAULT_CHAIN])
        .then((res) => {
          const token = new Token(
            chainId ?? DEFAULT_CHAIN,
            addressWithSymbol,
            res.results.transformed['decimals'],
            res.results.transformed['symbol'],
            res.results.transformed['name']
          );
          setCurrencies([token]);
        })
        .catch(() => {
          setCurrencies([]);
        });
    } else if (addressWithSymbol) {
      const tokens = EXTENDS_TOKENS[chainId ?? DEFAULT_CHAIN].filter((item) => {
        return (
          item.symbol?.toLocaleLowerCase() ===
          addressWithSymbol.toLocaleLowerCase()
        );
      });
      setCurrencies(tokens);
    } else {
      setCurrencies(EXTENDS_TOKENS[chainId ?? DEFAULT_CHAIN]);
    }
  }, [addressWithSymbol, chainId]);
  return currencies;
}
