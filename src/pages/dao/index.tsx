import React from 'react';
import { Link } from 'react-router-dom';
import { BRAVO_START_BLOCK } from '../../constants/proposals';
import { useProposals } from '../../hooks/useProposals';
import Proposals from '../../components/proposals';
import style from './index.module.scss';

export default function Dao() {
  const proposals = useProposals(BRAVO_START_BLOCK);
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <p className={style.header}>Governance Overview</p>
        <div className={style.main}>
          <div
            className={`${style.col} ${style.col_middle_12} ${style.col_small_24}`}
          >
            <div className={style.overview}>
              <div>
                <p>0</p>
                <span>SYSX Remaing</span>
              </div>
              <Link to="/addProposal" className={style.overview_btn}>
                CREATE
                <i
                  className={[
                    `${style.overview_btn_icon}`,
                    `iconfont icon-arrowright`
                  ].join(' ')}
                />
              </Link>
            </div>
          </div>
          <div
            className={`${style.col} ${style.col_middle_6} ${style.col_small_12}`}
          >
            <div className={style.overview}>
              <div>
                <p>0</p>
                <span>Delegated</span>
              </div>
              <Link to="/vote" className={style.overview_btn}>
                VIEW
                <i
                  className={[
                    `${style.overview_btn_icon}`,
                    `iconfont icon-arrowright`
                  ].join(' ')}
                />
              </Link>
            </div>
          </div>
          <div
            className={`${style.col} ${style.col_middle_6} ${style.col_small_12}`}
          >
            <div className={style.overview}>
              <div>
                <p>0</p>
                <span>Addresses</span>
              </div>
            </div>
          </div>
        </div>
        <Proposals proposals={proposals} />
      </div>
    </div>
  );
}
