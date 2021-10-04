import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  effect: T,
  wait: number,
  deps: DependencyList,
): (() => void) => {
  // Create a callback with deps.
  const callback = useCallback(effect, [...deps, effect]);
  // Create hook to hold timer and callback
  const latestTimeout = useRef<NodeJS.Timeout>();
  const latestCallback = useRef<T>();

  // Reassign callback if it's changed.
  useEffect(() => {
    latestCallback.current = callback;
  }, [callback, wait]);

  return () => {
    // Clear lastest timeout if it's called again
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }

    // Re-assign lastestTimeout with latestCallback function
    latestTimeout.current = setTimeout(() => {
      if (typeof latestCallback.current === 'function') {
        latestCallback.current();
      }
    }, wait);
  };
};
