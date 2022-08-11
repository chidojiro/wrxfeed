import { isApiError, useErrorHandler } from '@/error';
import React from 'react';
import { toast } from 'react-toastify';
import useSwr, { SWRConfiguration } from 'swr';

export type UseFetcherConfiguration<T = any> = SWRConfiguration<T>;

export const useFetcher = <T = unknown>(
  key: string | unknown[] | null | undefined | false,
  callback: (...args: unknown[]) => Promise<T>,
  configs?: UseFetcherConfiguration<T>,
) => {
  const [prevData, setPrevData] = React.useState<T>();
  const { onError, ...restConfigs } = configs ?? {};

  const errorHandler = useErrorHandler();

  const handleError: SWRConfiguration['onError'] = async (error, key, config) => {
    const shouldUseDefaultErrorHandler = onError?.(error, key, config) ?? true;

    if (!shouldUseDefaultErrorHandler) return;

    if (isApiError(error)) {
      toast.error(error.details?.message);
    } else {
      await errorHandler(error);
    }
  };

  const swrReturn = useSwr<T>(
    key,
    async () => {
      const data = await callback();
      setPrevData(data);
      return data;
    },
    {
      onError: handleError,
      ...restConfigs,
    },
  );

  return React.useMemo(
    () => ({
      ...swrReturn,
      data: swrReturn.data ?? prevData,
      isInitializing: !swrReturn.error && !swrReturn.data && swrReturn.isValidating,
    }),
    [prevData, swrReturn],
  );
};
