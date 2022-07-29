import { useHandler, UseHandlerConfigurations } from '@/common/hooks';
import { isApiError } from '@/error';
import { Subscription } from '@/main/entity';
import React from 'react';
import { toast } from 'react-toastify';
import { SubscriptionApis } from './apis';
import { UpdateSubscriptionPayload } from './types';
import { useSubscription } from './useSubscription';

export const useSubscribe = <T extends { id: number; name: string }>(
  configs?: UseHandlerConfigurations<Subscription>,
) => {
  const { mutateSubscription } = useSubscription();

  const { handle: subscribe, isLoading: isSubscribing } = useHandler(
    (type: keyof UpdateSubscriptionPayload, item: T | T[]) => {
      const ids = [item].flat().map(({ id }) => id);
      const params = { [type]: ids };
      return SubscriptionApis.update(params);
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
            toast.error('Can not follow these channels. Please check your network and try again.');
          } else {
            toast.error(`Can not follow ${item.name}. Please check your network and try again.`);
          }

          return false;
        }
      },
    },
  );

  return React.useMemo(() => ({ subscribe, isSubscribing }), [isSubscribing, subscribe]);
};
