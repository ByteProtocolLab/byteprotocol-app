import React from 'react';
import style from './index.module.scss';

export default function Popover({
  children,
  visible,
  title,
  onCancel,
  onBack
}: {
  children: React.ReactChild | React.ReactChildren | React.ReactElement<any>[];
  visible: boolean;
  title?: string;
  onCancel?: () => void;
  onBack?: () => void;
}) {
  return (
    <div>
      {visible && (
        <div className={style.wrapper}>
          <div
            className={style.mask}
            onClick={(e) => {
              e.stopPropagation();
              onCancel && onCancel();
            }}
          />
          <div className={style.container}>
            <div className={style.header}>
              {onBack ? (
                <i
                  className={[
                    `${style.header_back}`,
                    `iconfont icon-left`
                  ].join(' ')}
                  onClick={onBack}
                />
              ) : (
                <p className={style.header_title}>{title}</p>
              )}
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
            <div className={style.content}>{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
