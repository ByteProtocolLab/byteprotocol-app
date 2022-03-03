import React from 'react';
import style from './index.module.scss';

export default function Cookies({
  visible,
  onCancel,
  onOk
}: {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}) {
  return (
    <div>
      {visible && (
        <div className={style.wrapper}>
          <div className={style.container}>
            <div className={style.header}>
              <span className={style.header_title}>Accept Cookie</span>
              <i
                className={[
                  `${style.header_close_btn}`,
                  `iconfont icon-close`
                ].join(' ')}
                onClick={onCancel}
              />
            </div>
            <div className={style.content}>
              <div className={style.content_description}>
                <i className="iconfont icon-cookie" />
                <div>
                  <span>
                    We use cookies to ensure that we give you the best
                    experience on our website.
                  </span>
                  <span>For more info read Privacy policy</span>
                </div>
              </div>
              <button className={style.content_btn} onClick={onOk}>
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
