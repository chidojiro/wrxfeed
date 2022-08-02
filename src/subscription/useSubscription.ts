import { Subscription } from '@/main/entity';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { SubscriptionApis } from './apis';

export const useSubscription = () => {
  const { data, isInitializing, isValidating, mutate, error } = useFetcher(
    ['useSubscription'],
    () => SubscriptionApis.get(),
  );

  const isSubscribed = React.useCallback(
    (type: keyof Subscription, id: number) => !!data?.[type]?.some((item) => item.id === id),
    [data],
  );

  return React.useMemo(
    () => ({
      subscription: data,
      isInitializingSubscription: isInitializing,
      isValidatingSubscription: isValidating,
      mutateSubscription: mutate,
      subscriptionError: error,
      isSubscribed,
    }),
    [data, error, isInitializing, isSubscribed, isValidating, mutate],
  );
};
