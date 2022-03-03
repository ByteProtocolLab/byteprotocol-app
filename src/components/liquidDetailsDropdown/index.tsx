import React, { useState } from 'react';
import style from './index.module.scss';
import { useIntl } from 'react-intl';
import { Liquidity } from '../../hooks/useLiquidity';

export default function LiquidDetailsDropdown({
  liquidity
}: {
  liquidity?: Liquidity;
}) {
  const intl = useIntl();
  const [detailVisible, setDetailVisible] = useState(false);
  const [invert, setInvert] = useState(false);

  return (
    <div className={style.wrapper}>
      <div
        className={style.content}
        onClick={() => {
          setDetailVisible(!detailVisible);
        }}
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            setInvert(!invert);
          }}
        >
          {detailVisible || <i className={style.dot} />}
          {invert
            ? `1 ${liquidity?.outputAmount.currency.symbol ?? '--'} ~ ${
                liquidity?.rate?.invert().toSignificant(6) || 0
              } ${liquidity?.inputAmount.currency.symbol ?? '--'}`
            : `1 ${liquidity?.inputAmount.currency.symbol ?? '--'} ~ ${
                liquidity?.rate?.toSignificant(6) || 0
              } ${liquidity?.outputAmount.currency.symbol ?? '--'}`}
        </span>
        <i className="iconfont icon-down" />
      </div>
      {detailVisible && (
        <div>
          <div className={style.item}>
            <span>
              {intl.formatMessage({ id: 'expectedOutput' })}
              <i
                className={[
                  `${style.item_icon}`,
                  `iconfont icon-question-circle`
                ].join(' ')}
              />
            </span>
            <span>
              {`${liquidity?.liquidity.toSignificant(6) ?? '--'} ${
                liquidity?.inputAmount.currency.symbol ?? '--'
              }/${liquidity?.outputAmount.currency.symbol ?? '--'} Tokens`}
              <i className={style.item_dot} />
            </span>
          </div>
          <div className={style.item}>
            <span>
              {intl.formatMessage({ id: 'shareOfPool' })}
              <i
                className={[
                  `${style.item_icon}`,
                  `iconfont icon-question-circle`
                ].join(' ')}
              />
            </span>
            <span>{`${liquidity?.share?.toSignificant(4) ?? '--'}%`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
