import React from 'react';
import { useFetcher } from './useFetcher';
import { useHandler, UseHandlerConfigurations } from './useHandler';

export type UseInfiniteFetcherConfigs<T> = UseHandlerConfigurations<T[]> & {
  defaultData?: T[];
  initialFetch?: () => Promise<T[]>;
  handleUpdate?: (id: number, payload: Partial<T>) => any;
  handleDelete?: (id: number) => any;
  handleCreate?: (payload: any) => any;
  reverse?: boolean;
};

export const useInfiniteData = <T extends { id: number }>(
  fetcher: (...args: any[]) => Promise<T[]>,
  configs?: UseInfiniteFetcherConfigs<T>,
) => {
  const randomKey = React.useRef(Math.random());

  const {
    handleDelete: _handleDelete,
    handleUpdate: _handleUpdate,
    handleCreate: _handleCreate,
    initialFetch,
    reverse,
    defaultData,
    ...restConfigs
  } = configs ?? {};

  const [loadedData, setLoadedData] = React.useState<T[]>(defaultData ?? []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useFetcher(initialFetch && [randomKey.current], initialFetch!, {
    onSuccess: (data) => setLoadedData(reverse ? data.slice().reverse() : data),
  });

  const { isLoading, handle: loadMore } = useHandler(fetcher, restConfigs);

  const handleLoadMore = React.useCallback(
    async (...params: any[]) => {
      const data = await loadMore(...params);

      setLoadedData((prev) =>
        reverse ? [...data.slice().reverse(), ...prev] : [...prev, ...data],
      );

      return data;
    },
    [loadMore, reverse],
  );

  const handleDelete = React.useCallback(
    async (id: number) => {
      await _handleDelete?.(id);
      setLoadedData((prev) => prev.filter((item) => item.id !== id));
    },
    [_handleDelete],
  );

  const handleUpdate = React.useCallback(
    async (id: number, payload: Partial<T>) => {
      const data = (await _handleUpdate?.(id, payload)) ?? payload;

      setLoadedData((prev) =>
        prev.map((item) => {
          if (data && item.id === id) {
            return data;
          }

          return item;
        }),
      );

      return data;
    },
    [_handleUpdate],
  );

  const handleCreate = React.useCallback(
    async (payload: any) => {
      const data = (await _handleCreate?.(payload)) ?? payload;

      setLoadedData((prev) => (reverse ? [data, ...prev] : [...prev, data]));

      return data;
    },
    [_handleCreate, reverse],
  );

  const reset = React.useCallback(() => {
    setLoadedData([]);
  }, []);

  return React.useMemo(
    () => ({
      loadMore: handleLoadMore,
      data: loadedData,
      isLoading,
      delete: handleDelete,
      update: handleUpdate,
      create: handleCreate,
      reset,
    }),
    [handleCreate, handleDelete, handleLoadMore, handleUpdate, isLoading, loadedData, reset],
  );
};
