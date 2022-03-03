import React, { useState } from 'react';
import Help from '../help';
import style from './index.module.scss';

export default function Source() {
  const [active, setActive] = useState(false);

  return (
    <div className={style.wrapper}>
      <ul
        className={`${style.box} ${active ? style.active : undefined}`}
        onClick={() => {
          setActive(!active);
        }}
      >
        <li className={`${style.item} ${style.top}`} />
        <li className={`${style.item} ${style.middle}`} />
        <li className={`${style.item} ${style.bottom}`} />
      </ul>
      <Help
        visible={active}
        onCancel={() => {
          setActive(false);
        }}
      />
    </div>
  );
}
