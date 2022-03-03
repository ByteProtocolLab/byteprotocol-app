import React, { useMemo } from 'react';
import { defaultAbiCoder } from 'ethers/lib/utils';
import { Link } from 'react-router-dom';
import Avatar from '../../components/avatar';
import Steps from '../../components/steps';
import { ProposalState } from '../../entities/Proposal';
import { useProposal } from '../../hooks/useGovernorBravoDelegator';
import { useGovernance, useProposals, useVote } from '../../hooks/useProposals';
import Votes from '../../components/votes';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import style from './index.module.scss';

export default function Proposal({ match }: { match: any }) {
  const { params } = match;
  const proposalData = useProposal(params.id);
  const governance = useGovernance();
  const blockRange = useMemo(() => {
    return proposalData && governance
      ? [
          proposalData.startBlock.sub(governance.votingDelay).toHexString(),
          proposalData.startBlock.sub(governance.votingDelay).toHexString()
        ]
      : [0, 0];
  }, [governance, proposalData]);
  const proposals = useProposals(blockRange[0], blockRange[1]);
  const proposal = useMemo(() => {
    return proposals.filter(
      (item) => item.id.toNumber() === parseInt(params.id)
    )[0];
  }, [params.id, proposals]);
  const { forVotes, againstVotes } = useVote(
    params.id,
    proposal?.startBlock.toHexString(),
    proposal?.endBlock.toHexString()
  );
  const details = useMemo(() => {
    if (proposal) {
      return proposal.signatures?.map((item, index) => {
        const target = proposal.targets?.[index];
        const signature = proposal.signatures?.[index];
        const calldata = proposal.calldatas?.[index];
        const types = signature
          ? signature?.slice(
              signature.lastIndexOf('(') + 1,
              signature.lastIndexOf(')')
            )
          : '';
        const values = defaultAbiCoder.decode(
          types.split(','),
          '0x' + calldata?.replace(/0x/i, '')
        );
        const method = signature?.replace(types, values.join(','));
        return {
          target,
          method
        };
      });
    } else {
      return [];
    }
  }, [proposal]);

  return (
    <div>
      {proposal && (
        <div className={style.wrapper}>
          <div className={style.container}>
            <Link to="/dao" className={style.back}>
              <i
                className={[
                  `${style.back_icon}`,
                  `iconfont icon-arrowleft`
                ].join(' ')}
              />
              <p>PROPOSAL</p>
            </Link>
            <div className={style.header}>
              <div className={style.header_left}>
                <p className={style.header_left_title}>{proposal.title}</p>
                <div className={style.header_left_box}>
                  {proposal.state === 0 || proposal.state === 1 ? (
                    <p className={style.header_left_box_warn}>
                      {ProposalState[proposal.state]}
                    </p>
                  ) : proposal.state === 3 || proposal.state === 6 ? (
                    <p className={style.header_left_box_danger}>
                      {ProposalState[proposal.state]}
                    </p>
                  ) : proposal.state === 2 ? (
                    <p className={style.header_left_box_cancel}>
                      {ProposalState[proposal.state]}
                    </p>
                  ) : (
                    <p className={style.header_left_box_success}>
                      {ProposalState[proposal.state]}
                    </p>
                  )}
                  <span>{proposal.id.toNumber()} • Queued March 17th, 202</span>
                </div>
              </div>
              <div className={style.header_right}>
                <Avatar
                  width={27}
                  height={27}
                  edge={15}
                  address={proposal.proposer}
                />
                <a
                  target="_blank"
                  href={'https://cn.etherscan.com/address/' + proposal.proposer}
                  className={style.header_right_account}
                  rel="noreferrer"
                >
                  {proposal.proposer.substring(0, 6) +
                    '...' +
                    proposal.proposer.substring(
                      proposal.proposer.length - 5,
                      proposal.proposer.length
                    )}
                </a>
              </div>
            </div>
            <div className={style.vote}>
              <div className={style.vote_item}>
                <Votes
                  title="For"
                  voteAmount={
                    proposalData
                      ? parseInt(proposalData.forVotes.toHexString()) / 10 ** 18
                      : 0
                  }
                  votes={forVotes}
                  percent={
                    proposalData
                      ? (parseInt(proposalData.forVotes.toHexString()) /
                          (parseInt(proposalData.againstVotes.toHexString()) +
                            parseInt(proposalData.forVotes.toHexString()))) *
                        100
                      : 0
                  }
                />
              </div>
              <div className={style.vote_item}>
                <Votes
                  title="Against"
                  voteAmount={
                    proposalData
                      ? parseInt(proposalData.againstVotes.toHexString()) /
                        10 ** 18
                      : 0
                  }
                  votes={againstVotes}
                  percent={
                    proposalData
                      ? (parseInt(proposalData.againstVotes.toHexString()) /
                          (parseInt(proposalData.againstVotes.toHexString()) +
                            parseInt(proposalData.forVotes.toHexString()))) *
                        100
                      : 0
                  }
                />
              </div>
            </div>
            <div className={style.content}>
              <div className={style.content_info}>
                <div className={style.content_info_box}>
                  <p className={style.content_info_box_label}>Details</p>
                  <div className={style.content_info_box_main}>
                    {details?.map((item, index) => {
                      return (
                        <p
                          className={style.content_info_box_main_item}
                          key={index}
                        >
                          <a
                            target="_blank"
                            href={
                              'https://cn.etherscan.com/address/' + item.target
                            }
                            rel="noreferrer"
                          >
                            {item.target === governance.comp
                              ? 'SYSX'
                              : item.target == governance.timelock
                              ? 'TIMELOCK'
                              : item.target}
                          </a>
                          .{item.method}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className={style.content_info_box}>
                  <p className={style.content_info_box_label}>Description</p>
                  <div className={style.content_info_box_main}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {proposal?.description}
                    </ReactMarkdown>
                  </div>
                </div>
                {proposal.state == ProposalState.Active && (
                  <div className={style.content_info_box}>
                    <p className={style.content_info_box_label}>Vote</p>
                    <div className={style.content_info_box_main}>
                      <button className={style.content_info_box_main_btn}>
                        Support
                      </button>
                      <button className={style.content_info_box_main_btn}>
                        Against
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className={style.content_history}>
                <p className={style.content_history_title}>Proposal History</p>
                <Steps
                  steps={[
                    {
                      title: 'Created',
                      description: 'February 4th, 2022 – 7:17pm',
                      state: -1
                    },
                    {
                      title: ProposalState[proposal.state],
                      description: 'February 4th, 2022 – 7:17pm',
                      state: proposal.state
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
