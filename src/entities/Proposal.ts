import { BigNumber } from 'ethers';

export enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed
}

export interface Receipt {
  /// @notice Whether or not a vote has been cast
  hasVoted: boolean;
  /// @notice Whether or not the voter supports the proposal
  support: boolean;
  /// @notice The number of votes the voter had, which were cast
  votes: boolean;
}

export interface Proposal {
  id: BigNumber;
  title: string;
  description: string;
  proposer: string;
  state: number;
  startBlock: BigNumber;
  endBlock: BigNumber;
  forVotes: BigNumber;
  againstVotes: BigNumber;
  canceled?: boolean;
  executed?: boolean;
  receipts?: { address: string; receipt: Receipt };
  eta?: BigNumber;
  targets?: string[];
  values?: BigNumber[];
  signatures?: string[];
  calldatas?: string[];
}

export interface ProposalEvent {
  id: BigNumber;
  proposer: string;
  startBlock: BigNumber;
  endBlock: BigNumber;
  description: string;
  targets: string[];
  values: BigNumber[];
  signatures: string[];
  calldatas: string[];
}

export interface VoteCastEvent {
  voter: string;
  proposalId: BigNumber;
  support: boolean;
  votes: BigNumber;
  reason: string;
}
