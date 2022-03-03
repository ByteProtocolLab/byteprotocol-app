/* eslint-disable object-curly-newline */
import React from 'react';
import { Link } from 'react-router-dom';
import Proposals from '../../components/proposals';
import { BRAVO_START_BLOCK } from '../../constants/proposals';
import { useProposals } from '../../hooks/useProposals';
import style from './index.module.scss';

export default function Vote() {
  const proposals = useProposals(BRAVO_START_BLOCK);
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Link to="/dao" className={style.back}>
          <div className={style.back_icon}>
            <i className="iconfont icon-arrowleft" />
          </div>
          <p>PROPOSAL</p>
        </Link>
        <div className={style.main}>
          <div className={style.wallet}>
            <p className={style.wallet_header}>Voting Wallet</p>
            <div className={style.wallet_box}>
              <p>SYSX Balance</p>
              <span>0.00000000</span>
            </div>
            <div className={style.wallet_footer}>
              <p className={style.wallet_describe}>
                you can either vote on each proposal yourself or delegate your
                votes to a third party.
              </p>
              <button type="button" className={style.wallet_btn}>
                Get start
              </button>
            </div>
          </div>
          <div className={style.content}>
            <Proposals proposals={proposals} />
          </div>
        </div>
      </div>
    </div>
  );
}
