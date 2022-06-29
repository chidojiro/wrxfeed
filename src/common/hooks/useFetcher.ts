import { isApiError, useErrorHandler } from '@/error';
import React from 'react';
import { toast } from 'react-toastify';
import useSwr, { SWRConfiguration } from 'swr';

export const useFetcher = <T = unknown>(
  key: string | unknown[] | null | undefined | false,
  callback: (...args: unknown[]) => Promise<T>,
  options?: SWRConfiguration<T>,
) => {
  const [data, setData] = React.useState<T>();
  const { onError, onSuccess, ...restOptions } = options ?? {};

  const errorHandler = useErrorHandler();

  const handleSuccess: SWRConfiguration['onSuccess'] = async (data, key, config) => {
    onSuccess?.(data, key, config);

    setData(data);
  };

  const handleError: SWRConfiguration['onError'] = async (error, key, config) => {
    onError?.(error, key, config);

    if (isApiError(error)) {
      toast.error(error.details?.message);
    } else {
      await errorHandler(error);
    }
  };

  const swrReturn = useSwr<T>(key, callback, {
    onError: handleError,
    onSuccess: handleSuccess,
    ...restOptions,
  });

  return React.useMemo(
    () => ({
      ...swrReturn,
      data,
      isLoading: !swrReturn.error && !swrReturn.data && swrReturn.isValidating,
    }),
    [data, swrReturn],
  );
};
