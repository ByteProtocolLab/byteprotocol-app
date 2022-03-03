import { BigNumber } from 'ethers';
import { useMemo, useState } from 'react';
import { Proposal } from '../entities/Proposal';
import { useGovernorBravoDelegatorContract } from './useContract';

export function useProposal(id: BigNumber): Proposal | undefined {
  const contract = useGovernorBravoDelegatorContract();
  const [proposal, setProposal] = useState<Proposal>();
  useMemo(() => {
    contract?.proposals(id).then((res: any) => {
      setProposal(res);
    });
  }, [contract, id]);
  return proposal;
}
