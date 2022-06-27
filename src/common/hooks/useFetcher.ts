import { isApiError, useErrorHandler } from '@/error';
import React from 'react';
import { toast } from 'react-toastify';
import useSwr, { SWRConfiguration } from 'swr';

export const useFetcher = <T = unknown>(
  key: string | unknown[] | null | undefined | false,
  callback: (...args: unknown[]) => Promise<T>,
  options?: SWRConfiguration<T>,
) => {
  const { onError, ...restOptions } = options ?? {};

  const errorHandler = useErrorHandler();

  const handleError: SWRConfiguration['onError'] = async (error, key, config) => {
    onError?.(error, key, config);

    if (isApiError(error)) {
      toast.error(error.details?.message);
    } else {
      await errorHandler(error);
    }
  };

  const swrReturn = useSwr<T>(key, callback, { onError: handleError, ...restOptions });

  return React.useMemo(
    () => ({
      ...swrReturn,
      isLoading: !swrReturn.error && !swrReturn.data && swrReturn.isValidating,
    }),
    [swrReturn],
  );
};
