import { useHandler } from '@/common/hooks';
import { isBadRequest } from '@/error/utils';
import { FeedApis } from '@/feed/apis';
import { LineItem, TransLineItem } from '@/main/entity';
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
  const { handle: updateLineItemById, isLoading } = useHandler(
    async (id: number, data: Partial<TransLineItem>) => {
      await FeedApis.updateLineItem(id, data);
      callback?.onSuccess(data);
    },
    {
      onError: (error: any) => {
        if (callback?.onError) {
          callback?.onError(error);
          return false;
        }
        if (isBadRequest(error)) {
          toast.error(error?.details?.message);
          return false;
        }
      },
    },
  );

  return { updateLineItemById, isLoading };
}
