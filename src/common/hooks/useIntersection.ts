import { useState, useEffect } from 'react';
import { HTMLElementOrHTMLElementRef } from '../types';
import { AssertUtils } from '../utils';

/**
 * Hook to detect if element is visible on screen
 */
export const useIntersection = (
  elementOrElementRef?: HTMLElementOrHTMLElementRef | null,
  rootMargin?: string,
): boolean => {
  const element = AssertUtils.isRef<HTMLElement>(elementOrElementRef)
    ? elementOrElementRef.current
    : elementOrElementRef;

  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin },
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element, rootMargin]);

  return isVisible;
};
