import React, { useEffect, useRef } from 'react';
import Jazzicon from '@metamask/jazzicon';
import style from './index.module.scss';

export default function Identicon({ account }: { account: string }) {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);

  return <div ref={ref as any} className={style.container} />;
}
