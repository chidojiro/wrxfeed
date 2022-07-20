import { isApiError, useErrorHandler } from '@/error';
import React from 'react';
import { toast } from 'react-toastify';
import useSwr from 'swr';

type HandlerOptions<T = unknown> = {
  onError?: (error: unknown) => void;
  onSuccess?: (data: T) => void;
};

type HandlerOptionsKeys = keyof HandlerOptions;
const HandlerOptionsKeys: HandlerOptionsKeys[] = ['onSuccess', 'onError'];

export const useHandler = <T = void>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => Promise<T>,
  options?: HandlerOptions<T>,
) => {
  const [refreshToken, setRefreshToken] = React.useState<number>();
  const dataPromiseRef = React.useRef<Promise<T>>();
  const dataResolveRef = React.useRef<(data: T) => void>();
  const argsRef = React.useRef<unknown[]>();

  const errorHandler = useErrorHandler();

  const handle = React.useCallback((...params: unknown[]) => {
    argsRef.current = params ?? [];
    setRefreshToken(Math.random());

    dataPromiseRef.current = new Promise((res) => {
      dataResolveRef.current = res;
    });

    return dataPromiseRef.current;
  }, []);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _options: HandlerOptions<T> = {
    ...options,
    onError: async (error) => {
      options?.onError?.(error);

      if (isApiError(error)) {
        toast.error(error.details?.message);
      } else {
        await errorHandler(error);
      }
    },
  };

  const args = argsRef.current;

  const { data, error, isValidating } = useSwr(
    !!args && [args, refreshToken],
    async (args) => {
      const res = await callback(...(args as unknown[]));

      dataResolveRef.current?.(res);

      return res;
    },
    _options,
  );

  return React.useMemo(
    () => ({ data, error, isLoading: isValidating, handle }),
    [data, error, isValidating, handle],
  );
};
