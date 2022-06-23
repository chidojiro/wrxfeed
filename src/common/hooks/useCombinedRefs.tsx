/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, Ref, MutableRefObject } from 'react';

/**
 * Combine many refs in one
 */
export const useCombinedRefs = <T,>(
  ...refs: Array<Ref<T> | MutableRefObject<T>>
): MutableRefObject<T | null> => {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        // eslint-disable-next-line no-param-reassign
        (ref as MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};
