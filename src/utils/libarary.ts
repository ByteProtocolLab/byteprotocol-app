import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants/address';
import invariant from 'tiny-invariant';
import { BigNumber } from 'ethers';
import JSBI from 'jsbi';
import { Fraction } from '@uniswap/sdk-core';

const MINIMUM_LIQUIDITY = 10 ** 3;

export function sortTokens(
  tokenA: string,
  tokenB: string
): [token0: string, token1: string] {
  invariant(tokenA != tokenB, 'IDENTICAL_ADDRESSES');
  return tokenA.toLowerCase() < tokenB.toLowerCase()
    ? [tokenA, tokenB]
    : [tokenB, tokenA];
}

export function quote(
  amountA: BigNumber,
  reserveA: BigNumber,
  reserveB: BigNumber
): BigNumber {
  invariant(amountA.gt(0), 'INSUFFICIENT_AMOUNT');
  invariant(reserveA.gt(0) && reserveB.gt(0), 'INSUFFICIENT_LIQUIDITY');
  return amountA.mul(reserveB).div(reserveA);
}

export function getAmountOut(
  amountIn: BigNumber,
  reserveIn: BigNumber,
  reserveOut: BigNumber
) {
  invariant(amountIn.gt(0), 'INSUFFICIENT_INPUT_AMOUNT');
  invariant(reserveIn.gt(0) && reserveOut.gt(0), 'INSUFFICIENT_LIQUIDITY');
  const amountInWithFee = amountIn.mul(997);
  const numerator = amountInWithFee.mul(reserveOut);
  const denominator = reserveIn.mul(1000).add(amountInWithFee);
  return numerator.div(denominator);
}

export function getAmountIn(
  amountOut: BigNumber,
  reserveIn: BigNumber,
  reserveOut: BigNumber
) {
  invariant(amountOut.gt(0), 'INSUFFICIENT_OUTPUT_AMOUNT');
  invariant(reserveIn.gt(0) && reserveOut.gt(0), 'INSUFFICIENT_LIQUIDITY');
  const numerator = reserveIn.mul(amountOut).mul(1000);
  const denominator = reserveOut.sub(amountOut).mul(997);
  return numerator.div(denominator).add(1);
}

export function pairFor(tokenA: string, tokenB: string): string {
  const [token0, token1] = sortTokens(tokenA, tokenB);
  const salt = keccak256(
    ['bytes'],
    [pack(['address', 'address'], [token0, token1])]
  );
  return getCreate2Address(FACTORY_ADDRESS, salt, INIT_CODE_HASH);
}

export function getLiquidity(
  totalSupply: JSBI,
  reserve0: JSBI,
  reserve1: JSBI,
  amount0: JSBI,
  amount1: JSBI
) {
  let liquidity;
  if (JSBI.EQ(totalSupply, JSBI.BigInt(0))) {
    console.log(JSBI.divide(JSBI.BigInt(1), JSBI.BigInt(2)));
    liquidity = JSBI.subtract(
      sqrt(JSBI.multiply(amount0, amount1)),
      JSBI.BigInt(MINIMUM_LIQUIDITY)
    );
  } else {
    const x = JSBI.divide(JSBI.multiply(amount0, totalSupply), reserve0);
    const y = JSBI.divide(JSBI.multiply(amount1, totalSupply), reserve1);
    liquidity = JSBI.lessThan(x, y) ? x : y;
  }
  return new Fraction(liquidity, JSBI.BigInt(10 ** 18));
}

export function getAmount(
  liquidity: JSBI,
  balance0: JSBI,
  balance1: JSBI,
  totalSupply: JSBI
) {
  const amount0 = JSBI.divide(JSBI.multiply(liquidity, balance0), totalSupply);
  const amount1 = JSBI.divide(JSBI.multiply(liquidity, balance1), totalSupply);
  invariant(
    JSBI.GT(amount0, 0) && JSBI.GT(amount1, 0),
    'INSUFFICIENT_LIQUIDITY_BURNED'
  );
  return { amount0, amount1 };
}

export function sqrt(y: JSBI): JSBI {
  if (JSBI.greaterThan(y, JSBI.BigInt(3))) {
    let z = y;
    let x = JSBI.add(JSBI.divide(y, JSBI.BigInt(2)), JSBI.BigInt(1));
    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), JSBI.BigInt(2));
    }
    return z;
  } else if (JSBI.notEqual(y, JSBI.BigInt(0))) {
    return JSBI.BigInt(1);
  } else {
    return JSBI.BigInt(1);
  }
}
