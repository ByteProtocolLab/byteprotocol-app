import { BigNumber } from '@ethersproject/bignumber';
import { Currency, CurrencyAmount, Fraction, Percent } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { ChainId } from '../connectors/chains';

/**
 * Returns the gas value plus a margin for unexpected or variable gas costs
 * @param value the gas value to pad
 */
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(120).div(100);
}

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export function isZero(hexNumberString: string) {
  return /^0x0*$/.test(hexNumberString);
}

const ONE = new Fraction(1, 1);

export function calculateSlippageAmount(
  value: CurrencyAmount<Currency>,
  slippage: Percent
): [JSBI, JSBI] {
  if (slippage.lessThan(0) || slippage.greaterThan(ONE))
    throw new Error('Unexpected slippage');
  return [
    value.multiply(ONE.subtract(slippage)).quotient,
    value.multiply(ONE.add(slippage)).quotient
  ];
}

export function constructSameAddressMap<T extends string>(
  address: T,
  additionalNetworks: ChainId[] = []
): { [chainId: number]: T } {
  return additionalNetworks.reduce<{
    [chainId: number]: T;
  }>((memo, chainId) => {
    memo[chainId] = address;
    return memo;
  }, {});
}
