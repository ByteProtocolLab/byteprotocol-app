import React, { useRef, useEffect, useState, useCallback } from 'react';
import style from './index.module.scss';

export default function Slider({
  min,
  max,
  initValue,
  onChange
}: {
  min: number;
  max: number;
  initValue: number;
  onChange: (value: number) => void;
}) {
  const sliderRef: React.MutableRefObject<any> = useRef();
  const [offsetDistance, setOffsetDistance] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);

  const getOffsetLeft = useCallback((node: any): number => {
    if (node.offsetParent) {
      return node.offsetLeft + getOffsetLeft(node.offsetParent);
    }
    return node.offsetLeft;
  }, []);

  useEffect(() => {
    const distance =
      ((initValue - min) / (max - min)) * sliderRef.current.offsetWidth;
    setOffsetDistance(distance);
    setOffsetWidth(sliderRef.current.offsetWidth);
    setOffsetLeft(getOffsetLeft(sliderRef.current));
  }, [getOffsetLeft, initValue, max, min]);

  const onMouseMoving = () => {
    document.onmousemove = (moveEvent: any) => {
      const event = moveEvent || window.event;
      const distance = event.clientX - offsetLeft;
      if (distance < 0 || distance > offsetWidth) {
        return;
      }
      setOffsetDistance(distance);
      const value = parseFloat(
        ((distance / offsetWidth) * (max - min) + min).toFixed(2)
      );
      onChange(value);
    };
    document.onmouseup = () => {
      document.onmousemove = null;
    };
  };

  const onTouchMoving = () => {
    document.ontouchmove = (moveEvent: any) => {
      const event = moveEvent || window.event;
      const distance = event.touches[0].clientX - offsetLeft;
      if (distance < 0 || distance > offsetWidth) {
        return;
      }
      setOffsetDistance(distance);
      const value = parseFloat(
        ((distance / offsetWidth) * (max - min) + min).toFixed(2)
      );
      onChange(value);
    };
    document.ontouchend = () => {
      document.ontouchmove = null;
    };
  };

  return (
    <div className={style.container}>
      <div ref={sliderRef} className={style.box}>
        <i
          aria-hidden="true"
          className={style.status}
          onTouchMove={onTouchMoving}
          onMouseDown={onMouseMoving}
          style={{ left: offsetDistance }}
        />
        <div className={style.bar} style={{ width: offsetDistance }} />
      </div>
      <div className={style.footer}>
        <p>
          {min}
          <i>%</i>
        </p>
        <p>
          {max}
          <i>%</i>
        </p>
      </div>
    </div>
  );
}
