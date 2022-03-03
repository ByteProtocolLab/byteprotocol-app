import React from 'react';
import style from './index.module.scss';

export default function Modal({
  children,
  visible,
  title,
  width,
  overflowY,
  onCancel
}: {
  children: React.ReactChild | React.ReactChildren | React.ReactElement<any>[];
  visible: boolean;
  title?: string;
  width?: number;
  overflowY?: boolean;
  onCancel?: () => void;
}) {
  return (
    <div>
      {visible && (
        <div
          className={style.wrapper}
          style={{
            width: width && width,
            marginLeft: width && -width / 2
          }}
        >
          <div
            className={style.mask}
            onClick={(e) => {
              e.stopPropagation();
              onCancel && onCancel();
            }}
          />
          <div className={style.container}>
            <div className={style.header}>
              <p className={style.header_title}>{title}</p>
              <i
                className={[
                  `${style.header_close_btn}`,
                  `iconfont icon-close`
                ].join(' ')}
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel && onCancel();
                }}
              />
            </div>
            <div
              className={style.content}
              style={{ overflowY: overflowY ? 'auto' : undefined }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
