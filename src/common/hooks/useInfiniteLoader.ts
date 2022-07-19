import { useDisclosure } from '@dwarvesf/react-hooks';
import React from 'react';
import { useFetcher } from './useFetcher';
import { useHandler } from './useHandler';
import { useIntersection } from './useIntersection';

const WAIT_FOR_NEXT_LOAD_TIMEOUT = 500;

export type UseInfiniteLoaderProps<T = unknown> = {
  onLoad: (page: number) => Promise<T>;
  until: (data: T) => boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  anchor: React.RefObject<HTMLElement> | HTMLElement | null;
  mode?: 'ON_DEMAND' | 'ON_SIGHT';
  defaultPage?: number;
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
  defaultPage,
}: UseInfiniteLoaderProps<T>): UseInfiniteLoaderReturn => {
  const [page, setPage] = React.useState(defaultPage ?? (mode === 'ON_DEMAND' ? 0 : 1));
  const readyForNextLoadTimeout = React.useRef<NodeJS.Timeout>();

  const isIntersected = useIntersection(anchor);

  const exhaustedDisclosure = useDisclosure();
  const readyForNextLoadDisclosure = useDisclosure({ defaultIsOpen: true });

  const handleLoad: typeof onLoad = (page) => {
    readyForNextLoadDisclosure.onClose();

    return onLoad(page);
  };

  const handleSuccess = (data: T) => {
    onSuccess?.(data);

    if (until(data)) {
      exhaustedDisclosure.onOpen();
    } else {
      exhaustedDisclosure.onClose();
    }

    readyForNextLoadTimeout.current = setTimeout(() => {
      readyForNextLoadDisclosure.onOpen();
    }, WAIT_FOR_NEXT_LOAD_TIMEOUT);
  };

  const { isInitializing: isLoading } = useFetcher(
    mode === 'ON_SIGHT' && !!page && ['infiniteLoader', page],
    () => handleLoad(page),
    {
      onSuccess: handleSuccess,
      onError,
    },
  );

  const { handle: loadMoreOnDemand } = useHandler(
    async () => {
      const newPage = page + 1;
      setPage((prev) => prev + 1);
      return handleLoad(newPage);
    },
    {
      onSuccess: handleSuccess,
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
    if (mode === 'ON_SIGHT') {
      increasePageOnIntersection();
    }
  }, [increasePageOnIntersection, mode]);

  return React.useMemo(
    () => ({
      isLoading,
      isExhausted: exhaustedDisclosure.isOpen,
      loadMore: mode === 'ON_DEMAND' ? loadMoreOnDemand : increasePage,
    }),
    [exhaustedDisclosure.isOpen, increasePage, isLoading, loadMoreOnDemand, mode],
  );
};
