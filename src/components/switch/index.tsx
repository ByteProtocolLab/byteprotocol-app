import React, { useState } from 'react';
import style from './index.module.scss';

export default function Switch({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const [check, setCheck] = useState(checked);

  const change = () => {
    const value = !check;
    setCheck(value);
    onChange(value);
  };

  return (
    <div
      className={[`${style.box}`, check ? `${style.box_checked}` : null].join(
        ' '
      )}
      aria-hidden
      onClick={change}
    >
      <i className={style.btn} />
    </div>
  );
}
