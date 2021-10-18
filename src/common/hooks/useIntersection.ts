import { useState, useEffect } from 'react';

/**
 * Hook to detect if element is visible on screen
 */
export const useIntersection = (element?: Element, rootMargin?: string): boolean => {
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

    return () => element && observer.unobserve(element);
  }, [element, rootMargin]);

  return isVisible;
};
