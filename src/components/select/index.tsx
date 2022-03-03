import React, { useState } from 'react';
import style from './index.module.scss';

export default function Select({
  value,
  options,
  onChange
}: {
  value?: string | number;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={style.wrapper}>
      <div
        className={style.box}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <span className={style.value}>{value}</span>
        <i className={[`${style.btn}`, `iconfont icon-down`].join(' ')} />
      </div>
      {visible && (
        <div className={style.options}>
          {options.map((item, index) => {
            return (
              <div
                className={style.option}
                key={index}
                onClick={() => {
                  onChange(item.value);
                  setVisible(false);
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
