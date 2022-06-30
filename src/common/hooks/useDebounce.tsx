import { DependencyList, useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends (...args: any[]) => any>(
  effect: T,
  wait: number,
  deps: DependencyList,
): (() => void) => {
  // Create a callback with deps.
  const callback = useCallback(effect, [...deps, effect]);
  // Create hook to hold timer and callback
  const latestTimeout = useRef<number>();
  const latestCallback = useRef<T>();

  // Reassign callback if it's changed.
  useEffect(() => {
    latestCallback.current = callback;
  }, [callback, wait]);

  return (...args) => {
    // Clear lastest timeout if it's called again
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }

    // Re-assign lastestTimeout with latestCallback function
    latestTimeout.current = setTimeout(() => {
      if (typeof latestCallback.current === 'function') {
        latestCallback.current(...args);
      }
    }, wait);
  };
};
