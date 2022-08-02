import { useHandler, UseHandlerConfigurations } from '@/common/hooks';
import { isApiError } from '@/error';
import { Subscription } from '@/main/entity';
import React from 'react';
import { toast } from 'react-toastify';
import { SubscriptionApis } from './apis';
import { DeleteSubscriptionPayload } from './types';
import { useSubscription } from './useSubscription';

export const useUnsubscribe = <T extends { id: number; name: string }>(
  configs?: UseHandlerConfigurations<Subscription>,
) => {
  const { mutateSubscription } = useSubscription();

  const { handle: unsubscribe, isLoading: isUnsubscribing } = useHandler(
    (type: keyof DeleteSubscriptionPayload, item: T | T[]) => {
      const ids = [item].flat().map(({ id }) => id);
      const params = { [type]: ids };
      return SubscriptionApis.delete(params);
    },
    {
      onSuccess: (data) => {
        configs?.onSuccess?.(data);
        mutateSubscription();
      },
      onError: (error, handlerParams) => {
        configs?.onError?.(error, handlerParams);

        if (!isApiError(error)) {
          const item = handlerParams[1];

          if (Array.isArray(item)) {
            toast.error(
              'Can not unfollow these channels. Please check your network and try again.',
            );
          } else {
            toast.error(`Can not unfollow ${item.name}. Please check your network and try again.`);
          }

          return false;
        }
      },
    },
  );

  return React.useMemo(() => ({ unsubscribe, isUnsubscribing }), [isUnsubscribing, unsubscribe]);
};
