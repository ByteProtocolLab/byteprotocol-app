import React from 'react';
import style from './index.module.scss';

export enum ProcessType {
  PRIMARY,
  DANGER,
  WARN
}

export default function Process({
  percent,
  type
}: {
  percent: number;
  type: ProcessType;
}) {
  return (
    <div className={style.wrapper}>
      <div
        className={style.content}
        style={{
          width: percent + '%',
          backgroundColor:
            type === ProcessType.PRIMARY
              ? '#00d395'
              : ProcessType.DANGER
              ? '#e8006f'
              : ProcessType.WARN
              ? '#ff9c08'
              : '#00d395'
        }}
      ></div>
    </div>
  );
}
