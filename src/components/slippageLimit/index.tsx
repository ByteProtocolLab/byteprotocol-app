import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Modal from '../modal';
import Slider from '../slider';
import style from './index.module.scss';

export function SlippageLimitModal({
  slippageLimit,
  onOk
}: {
  slippageLimit: number;
  onOk: (value: number) => void;
}) {
  const intl = useIntl();
  const [currentSlippageLimit, setCurrentSlippageLimit] = useState(
    slippageLimit
  );
  return (
    <div>
      <div className={style.main}>
        <div className={style.main_value}>{currentSlippageLimit}%</div>
        <Slider
          onChange={setCurrentSlippageLimit}
          initValue={currentSlippageLimit}
          min={0.5}
          max={15}
        />
        <span className={style.main_tips}>
          {intl.formatMessage({ id: 'slippageSettingWarn' })}
        </span>
      </div>
      <button
        type="button"
        className={style.submit_btn}
        onClick={() => {
          onOk(currentSlippageLimit);
        }}
      >
        {intl.formatMessage({ id: 'confirm' })}
      </button>
    </div>
  );
}

export default function SlippageLimit({
  slippageLimit,
  visible,
  onOk,
  onCancel
}: {
  slippageLimit: number;
  visible: boolean;
  onOk: (value: number) => void;
  onCancel: () => void;
}) {
  const intl = useIntl();
  return (
    <Modal
      title={intl.formatMessage({ id: 'slippageSetting' })}
      visible={visible}
      onCancel={onCancel}
    >
      <SlippageLimitModal slippageLimit={slippageLimit} onOk={onOk} />
    </Modal>
  );
}
