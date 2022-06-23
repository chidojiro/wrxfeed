import { useApi } from '@/api';
import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { LineItem } from '@/main/entity';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateLineItemHookValues {
  updateLineItemById: (id: number, data: LineItem) => Promise<void>;
  isLoading: boolean;
}

interface LineItemModalCallback {
  onSuccess: (result: LineItem) => void;
  onError?: (error: unknown) => void;
}

export function useUpdateLineItem(callback?: LineItemModalCallback): UpdateLineItemHookValues {
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const updateLineItemById = useCallback(
    async (id: number, data: LineItem) => {
      try {
        setLoading(true);
        await ApiClient.updateLineItemById(id, data);
        callback?.onSuccess(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (callback?.onError) {
          callback?.onError(error);
        } else if (isBadRequest(error)) {
          toast.error(error?.details?.message);
        } else {
          await errorHandler(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [ApiClient, callback, errorHandler],
  );

  return { updateLineItemById, isLoading };
}
