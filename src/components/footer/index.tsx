import React from 'react';
import style from './index.module.scss';

export default function Footer() {
  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <p>SYSX community</p>
        <div className={style.main_list}>
          <a href="w" className="iconfont icon-reddit" />
          <a href="2" className="iconfont icon-twitter" />
          <a href="2" className="iconfont icon-github-fill" />
          <a href="2" className="iconfont icon-medium" />
        </div>
        <p className="home-menu-footer-label">© 2020 SYSX.Protocol</p>
      </div>
    </div>
  );
}
