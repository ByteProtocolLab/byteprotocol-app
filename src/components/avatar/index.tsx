import React from 'react';
import Geometry from '../../utils/geometry';

export default function Avatar({
  width,
  height,
  edge,
  address
}: {
  width: number;
  height: number;
  edge: number;
  address: string;
}) {
  return (
    <svg height={height} width={width}>
      {Geometry.computeHexagonPoints(width, height, edge).map((item, index) => (
        <circle
          cx={item[0]}
          cy={item[1]}
          r="2"
          stroke="black"
          strokeWidth="0"
          fill={`#` + `${address.substring(index * 3, (index + 1) * 3)}`}
          key={index}
        />
      ))}
    </svg>
  );
}
