import React from 'react';
import style from './index.module.scss';

export default function Input({
  value,
  className,
  type,
  pattern,
  placeholder,
  onChange,
  onFocus
}: {
  value?: any;
  type?: string;
  pattern?: string;
  placeholder?: string;
  className?: string;
  bordered?: boolean;
  onChange: (e: any) => void;
  onFocus?: (e: any) => void;
}) {
  const change = (e: any) => {
    if (pattern && e.target.value) {
      if (regularMatch(pattern, e.target.value)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  const regularMatch = (
    regexpPattern: string,
    regexpValue: string
  ): boolean => {
    const regexp = new RegExp(regexpPattern);
    if (regexpValue && regexp.test(regexpValue)) {
      return true;
    }
    return false;
  };

  return (
    <input
      type={type}
      onChange={change}
      onFocus={onFocus}
      value={value}
      placeholder={placeholder}
      className={className || style.container}
    />
  );
}
