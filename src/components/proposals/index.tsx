import React from 'react';
import { Link } from 'react-router-dom';
import { Proposal, ProposalState } from '../../entities/Proposal';
import Avatar from '../avatar';
import style from './index.module.scss';

export default function Proposals({ proposals }: { proposals: Proposal[] }) {
  return (
    <div className={style.wrapper}>
      <p className={style.header}>Recent Proposals</p>
      <div>
        {proposals
          .sort((a, b) => (a.id.gt(b.id) ? -1 : 1))
          .map((item, index) => {
            return (
              <Link
                to={'/proposal/' + item.id.toNumber()}
                className={style.item}
                key={index}
              >
                <div className={style.item_left}>
                  <p className={style.item_left_title}>{item.title}</p>
                  <div className={style.item_left_sub}>
                    {item.id.toNumber()}:
                    <Avatar
                      width={27}
                      height={27}
                      edge={15}
                      address={item.proposer}
                    />
                    <p className={style.item_left_sub_account}>
                      {item.proposer}
                    </p>
                    • Created
                  </div>
                </div>
                <div className={style.item_right}>
                  {item.state === 0 || item.state === 1 ? (
                    <p className={style.item_right_warn}>
                      <i className="iconfont icon-check" />
                      {ProposalState[item.state]}
                    </p>
                  ) : item.state === 3 || item.state === 6 ? (
                    <p className={style.item_right_danger}>
                      <i className="iconfont icon-close" />
                      {ProposalState[item.state]}
                    </p>
                  ) : item.state === 2 ? (
                    <p className={style.item_right_cancel}>
                      <i className="iconfont icon-close" />
                      {ProposalState[item.state]}
                    </p>
                  ) : (
                    <p className={style.item_right_success}>
                      <i className="iconfont icon-check" />
                      {ProposalState[item.state]}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
      </div>
      <div className={style.more}>VIEW ALL PROPOSALS</div>
    </div>
  );
}
