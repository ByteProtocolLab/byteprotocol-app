import { useRef, useEffect, useCallback } from 'react';

export function useDebounce(fn: (...args: any[]) => void, delay: number) {
  const { current } = useRef({
    fn,
    timer: (null as unknown) as NodeJS.Timeout
  });
  useEffect(() => {
    current.fn = fn;
  }, [current, current.fn, fn]);

  return useCallback(
    (...args: any[]) => {
      if (current.timer) {
        clearTimeout((current.timer as unknown) as number);
      }
      current.timer = setTimeout(() => {
        current.fn.call(current.fn, ...args);
      }, delay);
    },
    [current, delay]
  );
}
