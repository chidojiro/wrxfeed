/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useRef, useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

/// Check if an element is in viewport
/// @param {number} offset - Number of pixels up to the observable element from the top
/// @param {number} throttleMilliseconds - Throttle observable listener, in ms
interface VisibilityHooksValue {
  isVisible: boolean;
  refVisible: MutableRefObject<any>;
}

type VisibilityParams = {
  offset?: number;
  throttleMilliseconds?: number;
};

export const useVisibility = <Element extends HTMLElement>({
  offset = 0,
  throttleMilliseconds = 1000,
}: VisibilityParams = {}): VisibilityHooksValue => {
  const [isVisible, setIsVisible] = useState(false);
  const refVisible = useRef<Element>(null);

  const onScroll = throttle(() => {
    if (!refVisible.current) {
      setIsVisible(false);
      return;
    }
    const { top } = refVisible?.current.getBoundingClientRect();
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
  }, throttleMilliseconds);

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  });

  return { isVisible, refVisible };
};
