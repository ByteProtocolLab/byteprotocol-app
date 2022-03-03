import { TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { useMemo } from 'react';
import { calculateGasMargin, isZero } from '../utils/common';

interface FailedCall {
  call: {
    address: string;
    calldata: string;
    value: string;
  };
  error: Error;
}

export default function useSendSwapTransaction(
  account: string | null | undefined,
  library: Web3Provider | undefined,
  calls: any[]
) {
  return useMemo(() => {
    if (!library || !account) {
      return { callback: null };
    }
    return {
      callback: async (): Promise<TransactionResponse> => {
        const estimatedCalls = await Promise.all(
          calls.map((call) => {
            const { address, calldata, value } = call;
            const tx =
              !value || isZero(value)
                ? { from: account, to: address, data: calldata }
                : {
                    from: account,
                    to: address,
                    data: calldata,
                    value
                  };
            return library
              .estimateGas(tx)
              .then((gasEstimate) => {
                return {
                  call,
                  gasEstimate
                };
              })
              .catch((gasError) => {
                console.debug(
                  'Gas estimate failed, trying eth_call to extract error',
                  call
                );
                return library
                  .call(tx)
                  .then((result) => {
                    console.debug(
                      'Unexpected successful call after failed estimate gas',
                      call,
                      gasError,
                      result
                    );
                    return {
                      call,
                      error:
                        'Unexpected issue with estimating the gas. Please try again.'
                    };
                  })
                  .catch((callError) => {
                    console.debug('Call threw error', call, callError);
                    return {
                      call,
                      error: callError
                    };
                  });
              });
          })
        );
        let bestCallOption = estimatedCalls.find(
          (el, ix, list) =>
            'gasEstimate' in el &&
            (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])
        );
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter(
            (call): call is FailedCall => 'error' in call
          );
          if (errorCalls.length > 0)
            throw errorCalls[errorCalls.length - 1].error;
          const firstNoErrorCall = estimatedCalls.find(
            (call) => !('error' in call)
          );
          if (!firstNoErrorCall)
            throw new Error(
              'Unexpected error. Could not estimate gas for the swap.'
            );
          bestCallOption = firstNoErrorCall;
        }
        const {
          call: { address, calldata, value }
        } = bestCallOption;
        return library
          .getSigner()
          .sendTransaction({
            from: account,
            to: address,
            data: calldata,
            // let the wallet try if we can't estimate the gas
            ...('gasEstimate' in bestCallOption
              ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) }
              : {}),
            ...(value && !isZero(value) ? { value } : {})
          })
          .then((response) => {
            return response;
          })
          .catch((error) => {
            throw error;
          });
      }
    };
  }, [account, calls, library]);
}
