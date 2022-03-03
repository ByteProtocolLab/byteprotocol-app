import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/input';
import style from './index.module.scss';

export default function AddProposal() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Link to="/dao" className={style.back}>
          <i
            className={[`${style.back_icon}`, `iconfont icon-arrowleft`].join(
              ' '
            )}
          />
          <p>Create Proposal</p>
        </Link>
        <div className={style.main}>
          <div className={style.main_item}>
            <p className={style.main_item_title}>授权到</p>
            <Input
              className={style.main_item_input}
              placeholder="钱包地址和ENS名"
              onChange={() => {
                console.log();
              }}
              onFocus={() => {
                console.log();
              }}
            />
          </div>
          <div className={style.main_item}>
            <Input
              className={style.main_item_info}
              placeholder="0.0"
              pattern="^\d*\.?\d*$"
              onChange={() => {
                console.log();
              }}
              onFocus={() => {
                console.log();
              }}
            />
          </div>
          <div className={style.main_item}>
            <p className={style.main_item_title}>提案</p>
            <Input
              className={style.main_item_input}
              placeholder="##请输入提案名称##"
              onChange={() => {
                console.log();
              }}
              onFocus={() => {
                console.log();
              }}
            />
            <p className={style.main_item_title}>内容</p>
            <textarea placeholder="##请输入提案内容##" />
          </div>
          <button type="button" className={style.main_button}>
            发起提案
          </button>
        </div>
      </div>
    </div>
  );
}
