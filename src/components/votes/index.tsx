import React, { useState } from 'react';
import { VoteCastEvent } from '../../entities/Proposal';
import Avatar from '../avatar';
import Modal from '../modal';
import Process, { ProcessType } from '../progress';
import style from './index.module.scss';

export function VoteList({
  title,
  voteAmount,
  votes,
  votesCount,
  percent
}: {
  title: string;
  voteAmount: number;
  votes: VoteCastEvent[];
  votesCount: number;
  percent: number;
}) {
  return (
    <div className={style.box}>
      <div className={style.header}>
        <p>{title}</p>
        <p>{voteAmount}</p>
      </div>
      <Process
        percent={percent}
        type={title === 'For' ? ProcessType.PRIMARY : ProcessType.DANGER}
      />
      <div className={style.item}>
        <p className={style.label}>{votesCount} addresses</p>
        <p className={style.label}>votes</p>
      </div>

      {votes.map((item, index) => {
        return (
          <div className={style.item} key={index}>
            <a
              target="_blank"
              href={'https://cn.etherscan.com/address/' + item.voter}
              className={style.voter}
              rel="noreferrer"
            >
              <Avatar width={27} height={27} edge={15} address={item.voter} />
              <span>
                {item.voter.substring(0, 6) +
                  '...' +
                  item.voter.substring(
                    item.voter.length - 6,
                    item.voter.length
                  )}
              </span>
              <i className="iconfont icon-safetycertificate-f" />
            </a>
            <p className={style.votes}>
              {parseInt(item.votes.toHexString()) / 10 ** 18}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function Votes({
  title,
  voteAmount,
  votes,
  percent
}: {
  title: string;
  voteAmount: number;
  votes: VoteCastEvent[];
  percent: number;
}) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <VoteList
        voteAmount={voteAmount}
        votes={votes.sort((a, b) => (a.votes.gt(b.votes) ? -1 : 1)).slice(0, 3)}
        title={title}
        votesCount={votes.length}
        percent={percent}
      />
      <div
        className={style.more}
        onClick={() => {
          setVisible(true);
        }}
      >
        VIEW ALL
      </div>
      <Modal
        title="VIEW ALL"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        overflowY
      >
        <VoteList
          voteAmount={voteAmount}
          votes={votes.sort((a, b) => (a.votes.gt(b.votes) ? -1 : 1))}
          votesCount={votes.length}
          title={title}
          percent={percent}
        />
      </Modal>
    </div>
  );
}
