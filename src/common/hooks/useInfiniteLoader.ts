import { useDisclosure } from '@dwarvesf/react-hooks';
import React from 'react';
import { useFetcher } from './useFetcher';
import { useIntersection } from './useIntersection';

const WAIT_FOR_NEXT_LOAD_TIMEOUT = 500;

export type UseInfiniteLoaderProps<T = unknown> = {
  onLoad: (page: number) => Promise<T>;
  until: (data: T) => boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  anchor: React.RefObject<HTMLElement> | HTMLElement | null;
  mode?: 'ON_DEMAND' | 'ON_SIGHT';
};

export type UseInfiniteLoaderReturn = {
  isExhausted: boolean;
  isLoading: boolean;
  loadMore: () => void;
};

export const useInfiniteLoader = <T = unknown>({
  onLoad,
  until,
  onError,
  onSuccess,
  anchor,
  mode = 'ON_SIGHT',
}: UseInfiniteLoaderProps<T>): UseInfiniteLoaderReturn => {
  const [page, setPage] = React.useState(1);
  const readyForNextLoadTimeout = React.useRef<NodeJS.Timeout>();

  const isIntersected = useIntersection(anchor);

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

  const increasePage = React.useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const increasePageOnIntersection = React.useCallback(() => {
    if (isIntersected && readyForNextLoadDisclosure.isOpen) {
      increasePage();
    }
  }, [increasePage, isIntersected, readyForNextLoadDisclosure.isOpen]);

  React.useEffect(() => {
    increasePageOnIntersection();
  }, [increasePageOnIntersection, mode]);

  return React.useMemo(
    () => ({ isLoading, isExhausted: exhaustedDisclosure.isOpen, loadMore: increasePage }),
    [exhaustedDisclosure.isOpen, increasePage, isLoading],
  );
};
