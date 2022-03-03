import React from 'react';
import style from './index.module.scss';

export interface Step {
  title: string;
  description: string;
  state: number;
}

export default function Steps({ steps }: { steps: any[] }) {
  return (
    <div className={style.container}>
      {steps.map((item, index) => {
        return (
          <div className={style.item} key={index}>
            <div className={style.left}>
              <div className={style.status}>
                <i className="iconfont icon-check" />
              </div>
            </div>
            <div className={style.right}>
              <p>{item.title}</p>
              <span>{item.description}</span>
            </div>
            {item.state === -1 && <i className={style.bar} />}
          </div>
        );
      })}
    </div>
  );
}
