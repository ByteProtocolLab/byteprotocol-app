import React, { useState } from 'react';
import Header from '../../components/header';
import style from './index.module.scss';
import Cookies from '../../components/cookies';

export default function Home({
  children
}: {
  children: React.ReactChild | React.ReactChildren | React.ReactElement<any>[];
}) {
  const [cookiesVisible, setCookiesVisible] = useState(
    'false' === localStorage.getItem('acceptCookie') ? false : true
  );
  return (
    <div className={style.container}>
      <Header />
      <div>{children}</div>
      <Cookies
        visible={cookiesVisible}
        onCancel={() => {
          setCookiesVisible(false);
        }}
        onOk={() => {
          setCookiesVisible(false);
          localStorage.setItem('acceptCookie', 'false');
        }}
      />
    </div>
  );
}
