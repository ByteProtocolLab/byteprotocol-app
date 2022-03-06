import React, { useState } from 'react';
import { Currency } from '@uniswap/sdk-core';
import { COMMON_BASES } from '../../constants/routing';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearch } from '../../hooks/useSearch';
import { useCurrencyBalances } from '../../hooks/useCurrencyBalance';
import { usePriceFeed } from '../../hooks/usePriceFeed';
import Input from '../input';
import TokenList from '../tokenList';
import BaseTokenList from '../baseTokenList';
import style from './index.module.scss';
import { useIntl } from 'react-intl';
import { ChainId } from '../../connectors/chains';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';

export default function Tokens({
  visible,
  onCancel,
  onChoose
}: {
  visible: boolean;
  onCancel: () => void;
  onChoose: (currency: Currency) => void;
}) {
  return (
    <>{visible && <TokensBox onCancel={onCancel} onChoose={onChoose} />}</>
  );
}

function TokensBox({
  onCancel,
  onChoose
}: {
  onCancel: () => void;
  onChoose: (currency: Currency) => void;
}) {
  const intl = useIntl();
  const { chainId } = useActiveWeb3React();
  const [address, setAddress] = useState<string>('');
  const currencies = useSearch(address);
  const balances = useCurrencyBalances(currencies);
  const priceFeed = usePriceFeed(currencies);

  const onSearch = useDebounce((e: any) => {
    const { value } = e.target;
    setAddress(value);
  }, 500);

  return (
    <div className={style.wrapper}>
      <div className={style.mask} onClick={onCancel} />
      <div className={style.cotainer}>
        <div className={style.search}>
          <Input
            placeholder={intl.formatMessage({ id: 'searchToken' })}
            onChange={onSearch}
            className={style.search_input}
          />
          <div className={style.search_icon} onClick={onCancel}>
            <i className="iconfont icon-close" />
          </div>
        </div>
        <div className={style.list}>
          <div className={style.list_recommend}>
            <div className={style.list_header}>
              <p className={style.list_header_name}>
                {intl.formatMessage({ id: 'recommend' })}
              </p>
            </div>
            <BaseTokenList
              currencies={COMMON_BASES[chainId ?? ChainId.BSC]}
              onChoose={onChoose}
            />
          </div>
          <div>
            <div className={style.list_header}>
              <p className={style.list_header_name}>
                {intl.formatMessage({ id: 'tokens' })}
              </p>
              <div className={style.list_header_play}>
                {intl.formatMessage({ id: 'recentTransactions' })}
                <i className="iconfont icon-sort-ascending" />
              </div>
            </div>
            <TokenList
              currencies={currencies}
              balances={balances}
              priceFeed={priceFeed}
              onChoose={onChoose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
