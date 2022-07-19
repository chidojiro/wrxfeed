import React from 'react';

const DEFAULT_DEBOUNCE_TIMEOUT = 1000;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/ban-types
export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  wait = DEFAULT_DEBOUNCE_TIMEOUT,
): T => {
  // Create hook to hold timer and callback
  const lastTimeout = React.useRef<NodeJS.Timeout>();

  const debouncedCallback = React.useCallback(
    (...args: any[]) => {
      clearTimeout(lastTimeout.current);

      lastTimeout.current = setTimeout(() => {
        callback(...args);
      }, wait);
    },
    [callback, wait],
  );

  return debouncedCallback as any;
};
