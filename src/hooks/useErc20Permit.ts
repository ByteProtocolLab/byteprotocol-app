import { splitSignature } from '@ethersproject/bytes';
import useActiveWeb3React from './useActiveWeb3React';
import { useState } from 'react';

export interface SignatureData {
  v: number;
  r: string;
  s: string;
  deadline: number;
}

export interface PermitMessage {
  owner: string;
  spender: string;
  value: string;
  nonce: number;
  deadline: number;
}

export interface PermitDomain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

const EIP712_DOMAIN_TYPE = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
];

const EIP2612_TYPE = [
  { name: 'owner', type: 'address' },
  { name: 'spender', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'deadline', type: 'uint256' }
];

export function useErc20Permit({
  domain,
  message
}: {
  domain?: PermitDomain;
  message?: PermitMessage;
}) {
  const { account, library } = useActiveWeb3React();
  const [signature, setSignature] = useState<SignatureData>();

  if (!domain || !message) return { signature, gatherPermitSignature: null };

  return {
    signature,
    gatherPermitSignature: async () => {
      const msgParams = JSON.stringify({
        types: {
          EIP712Domain: EIP712_DOMAIN_TYPE,
          Permit: EIP2612_TYPE
        },
        primaryType: 'Permit',
        domain: domain,
        message: message
      });

      return library
        ?.send('eth_signTypedData_v4', [account, msgParams])
        .then(splitSignature)
        .then((signature) => {
          setSignature({
            v: signature.v,
            r: signature.r,
            s: signature.s,
            deadline: message.deadline
          });
        });
    }
  };
}
