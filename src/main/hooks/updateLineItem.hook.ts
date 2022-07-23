import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { FeedApis } from '@/feed/apis';
import { LineItem, TransLineItem } from '@/main/entity';
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
  const errorHandler = useErrorHandler();

  const updateLineItemById = useCallback(
    async (id: number, data: Partial<TransLineItem>) => {
      try {
        setLoading(true);
        await FeedApis.updateLineItem(id, data);
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
    [callback, errorHandler],
  );

  return { updateLineItemById, isLoading };
}
