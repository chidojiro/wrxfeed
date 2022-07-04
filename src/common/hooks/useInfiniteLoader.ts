import { AssertUtils } from './../utils/assert';
import { useDisclosure } from '@dwarvesf/react-hooks';
import React from 'react';
import { useFetcher } from './useFetcher';

const WAIT_FOR_NEXT_LOAD_TIMEOUT = 500;

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
  const readyForNextLoadTimeout = React.useRef<number>();
  const [isIntersected, setIsIntersected] = React.useState(false);

  const exhaustedDisclosure = useDisclosure();
  const readyForNextLoadDisclosure = useDisclosure({ defaultIsOpen: true });

  const handleLoad: typeof onLoad = (page) => {
    readyForNextLoadDisclosure.onClose();

    return onLoad(page);
  };

  const { isInitializing: isLoading } = useFetcher(
    ['infiniteLoader', page],
    () => handleLoad(page),
    {
      onSuccess: (data) => {
        onSuccess?.(data);

        if (until(data)) {
          exhaustedDisclosure.onOpen();
        } else {
          exhaustedDisclosure.onClose();
        }

        readyForNextLoadTimeout.current = setTimeout(() => {
          readyForNextLoadDisclosure.onOpen();
        }, WAIT_FOR_NEXT_LOAD_TIMEOUT);
      },
      onError,
    },
  );

  const setPageOnIntersection = React.useCallback(() => {
    if (isIntersected && readyForNextLoadDisclosure.isOpen) {
      setPage((prev) => prev + 1);
    }
  }, [isIntersected, readyForNextLoadDisclosure.isOpen]);

  const observeIntersection = React.useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;

        setIsIntersected(isIntersecting);
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

  React.useEffect(() => {
    setPageOnIntersection();
  }, [setPageOnIntersection]);

  React.useEffect(() => {
    observeIntersection();
  }, [observeIntersection]);

  return React.useMemo(
    () => ({ isLoading, isExhausted: exhaustedDisclosure.isOpen }),
    [exhaustedDisclosure.isOpen, isLoading],
  );
};
