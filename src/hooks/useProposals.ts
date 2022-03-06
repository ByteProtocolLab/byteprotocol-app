import { aggregate } from '@makerdao/multicall';
import { BigNumber } from 'ethers';
import { useMemo, useState } from 'react';
import { GOVERNANCE_ADDRESSES } from '../constants/address';
import { CONFIG, DEFAULT_CHAIN } from '../constants/misc';
import { Proposal, ProposalEvent, VoteCastEvent } from '../entities/Proposal';
import useActiveWeb3React from './useActiveWeb3React';
import { useGovernorBravoDelegatorContract } from './useContract';

export function useProposals(
  startBlock?: string | number,
  endBlock?: string | number
): Proposal[] {
  const proposalCreatedLogs = useProposalCreatedLogs(startBlock, endBlock);
  const allProposalIds = useMemo(() => {
    return proposalCreatedLogs.map((log) => log.id.toHexString());
  }, [proposalCreatedLogs]);
  const states = useProposalStates(allProposalIds);
  return proposalCreatedLogs.map((p) => {
    return {
      ...p,
      title: p.description?.split(/# |\n/g)[1] || 'Untitled',
      state: states[p.id.toHexString()],
      forVotes: BigNumber.from(0),
      againstVotes: BigNumber.from(0)
    };
  });
}

export function useProposalCreatedLogs(
  fromBlockOrBlockhash?: string | number,
  toBlock?: string | number
) {
  const contract = useGovernorBravoDelegatorContract();
  const [proposalCreatedLogs, setProposalCreatedLogs] = useState<
    ProposalEvent[]
  >([]);
  useMemo(() => {
    const filter = contract?.filters.ProposalCreated();
    if (filter && toBlock !== 0) {
      contract
        ?.queryFilter(filter, fromBlockOrBlockhash, toBlock)
        .then((res) => {
          const proposalCreatedLogs: ProposalEvent[] = res.map((item: any) => {
            return {
              ...item.args
            } as ProposalEvent;
          });
          setProposalCreatedLogs(proposalCreatedLogs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [contract, fromBlockOrBlockhash, toBlock]);
  return proposalCreatedLogs;
}

export function useProposalStates(allProposalIds: string[]) {
  const { chainId } = useActiveWeb3React();
  const [states, setStates] = useState<{ [key: string]: number }>({});
  useMemo(() => {
    const calls = allProposalIds.map((id) => {
      return {
        target: GOVERNANCE_ADDRESSES,
        call: ['state(uint256)(uint8)', id],
        returns: [[id, (val: number) => val]]
      };
    });
    aggregate(calls, CONFIG[chainId ?? DEFAULT_CHAIN])
      .then((res: any) => {
        setStates(res.results.transformed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allProposalIds, chainId]);
  return states;
}

export function useVote(
  id: string,
  startBlock?: string | number,
  endBlock?: string | number
): { forVotes: VoteCastEvent[]; againstVotes: VoteCastEvent[] } {
  const voteCastLogs = useVoteCastLogs(startBlock, endBlock);
  return useMemo(() => {
    const forVotes = voteCastLogs.filter(
      (item) => item.proposalId.toNumber() === parseInt(id) && item.support
    );
    const againstVotes = voteCastLogs.filter(
      (item) => item.proposalId.toNumber() === parseInt(id) && !item.support
    );
    return { forVotes, againstVotes };
  }, [id, voteCastLogs]);
}

export function useVoteCastLogs(
  fromBlockOrBlockhash?: string | number,
  toBlock?: string | number
) {
  const contract = useGovernorBravoDelegatorContract();
  const [voteCastLogs, setVoteCastLogs] = useState<VoteCastEvent[]>([]);
  useMemo(() => {
    const filter = contract?.filters.VoteCast();
    if (filter && toBlock !== 0) {
      contract
        ?.queryFilter(filter, fromBlockOrBlockhash, toBlock)
        .then((res) => {
          const voteCastLogs: VoteCastEvent[] = res.map((item: any) => {
            return {
              ...item.args
            } as VoteCastEvent;
          });
          setVoteCastLogs(voteCastLogs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [contract, fromBlockOrBlockhash, toBlock]);
  return voteCastLogs;
}

export function useGovernance() {
  const { chainId } = useActiveWeb3React();
  const [governance, setGovernance] = useState<{
    [key: string]: BigNumber | string;
  }>({ timelock: '', comp: '', votingDelay: BigNumber.from(0) });
  useMemo(() => {
    const calls = [
      {
        target: GOVERNANCE_ADDRESSES,
        call: ['timelock()(address)'],
        returns: [['timelock']]
      },
      {
        target: GOVERNANCE_ADDRESSES,
        call: ['comp()(address)'],
        returns: [['comp']]
      },
      {
        target: GOVERNANCE_ADDRESSES,
        call: ['votingDelay()(uint256)'],
        returns: [['votingDelay']]
      }
    ];
    aggregate(calls, CONFIG[chainId ?? DEFAULT_CHAIN])
      .then((res: any) => {
        setGovernance(res.results.transformed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chainId]);
  return governance;
}
