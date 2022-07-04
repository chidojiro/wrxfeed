import { AssertUtils } from './../utils/assert';
import { useDisclosure } from '@dwarvesf/react-hooks';
import React from 'react';
import { useFetcher } from './useFetcher';

export type UseInfiniteLoaderProps<T = unknown> = {
  onLoad: (page: number) => Promise<T>;
  until: (data: T) => boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  anchor: React.RefObject<HTMLElement> | HTMLElement | null;
};

export type UseInfiniteLoaderReturn = {
  isExhausted: boolean;
  isLoading: boolean;
};

export const useInfiniteLoader = <T = unknown>({
  onLoad,
  until,
  onError,
  onSuccess,
  anchor,
}: UseInfiniteLoaderProps<T>): UseInfiniteLoaderReturn => {
  const [page, setPage] = React.useState(1);

  const exhaustDisclosure = useDisclosure();

  const { isInitializing: isLoading } = useFetcher(['infiniteLoader', page], () => onLoad(page), {
    onSuccess: (data) => {
      onSuccess?.(data);

      if (until(data)) {
        exhaustDisclosure.onOpen();
      } else {
        exhaustDisclosure.onClose();
      }
    },
    onError,
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;

        if (isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      },
    );

    const anchorNode = AssertUtils.isRef(anchor) ? anchor.current : anchor;

    if (anchorNode) {
      observer.observe(anchorNode);
    }
  }, [anchor]);

  return React.useMemo(
    () => ({ isLoading, isExhausted: exhaustDisclosure.isOpen }),
    [exhaustDisclosure.isOpen, isLoading],
  );
};
