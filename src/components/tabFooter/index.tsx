import React from 'react';
import style from './index.module.scss';

export default function TabFooter({ title }: { title: string }) {
  return (
    <div className={style.footer}>
      <p className={style.footer_title}>{title}</p>
      <div className={style.footer_tips}>
        <i className={style.footer_tips_tri} />
        <p className={style.footer_tips_desc}>POWER BY SYSX</p>
      </div>
    </div>
  );
}
