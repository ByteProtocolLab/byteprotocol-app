import React, { useState } from 'react';
import Input from '../input';
import Popover from '../popover';
import style from './index.module.scss';

export default function Claim({
  visible,
  onCancel
}: {
  visible: boolean;
  onCancel: () => void;
}) {
  const [claimAddress, setClaimAddress] = useState<string>();
  const setClaimOutput = (e: any) => {
    const { value } = e.target;
    setClaimAddress(value);
  };

  return (
    <Popover visible={visible} title="Claim" onCancel={onCancel}>
      <div className={style.wrapper}>
        <span className={style.info}>
          Enter an address to trigger a SYSX claim. If the address has any
          claimable SYSX it will be sent to them on submission.
        </span>
        <Input
          placeholder="Wallet Address or ENS name"
          value={claimAddress}
          className={style.input}
          onChange={setClaimOutput}
        />
        <button className={style.btn}>Claim SYSX</button>
      </div>
    </Popover>
  );
}
