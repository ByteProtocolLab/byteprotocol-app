import React from 'react';
import style from './index.module.scss';

export default function TabHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={style.header}>
      <div className={style.header_tab}>
        <p className={style.header_tab_left}>{title}</p>
        <div className={style.header_tab_right}>
          <i className={style.header_tab_right_tri} />
          <i className={style.header_tab_right_bar} />
        </div>
      </div>
      <div className={style.header_info}>
        <p className={style.header_info_label}>{description}</p>
      </div>
    </div>
  );
}
