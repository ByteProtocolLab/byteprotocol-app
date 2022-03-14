import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { SUPPORTED_MENUS } from '../../constants/menus';
import style from './index.module.scss';

export default function Menus({ initIndex }: { initIndex: number }) {
  const intl = useIntl();
  const [currentIndex, setCurrentIndex] = useState(initIndex);
  const change = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <div className={style.wrapper}>
      {Object.keys(SUPPORTED_MENUS).map((key, index) => (
        <Link
          to={SUPPORTED_MENUS[key].path}
          key={key}
          className={[
            style.item,
            currentIndex === index ? style.item_active : null
          ].join(' ')}
          onClick={() => {
            change(index);
          }}
        >
          <span className={style.item_name}>
            {intl.formatMessage({ id: SUPPORTED_MENUS[key].name })}
          </span>
          <div className={style.item_content}>
            {SUPPORTED_MENUS[key].children?.map((subItem, index) => (
              <Link to={subItem.path} key={index}>
                <span className={style.item_name}>
                  {intl.formatMessage({ id: subItem.name })}
                </span>
              </Link>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
