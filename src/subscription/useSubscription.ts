import { useLocalStorageState } from './../common/hooks/useLocalStorageState/useLocalStorageState';
import { Subscription } from '@/main/entity';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { SubscriptionApis } from './apis';

export const useSubscription = () => {
  const [localStorageSubscription, setLocalStorageSubscription] =
    useLocalStorageState<Subscription | null>('subscription', null);

  const { data, isInitializing, isValidating, mutate, error } = useFetcher(
    ['useSubscription'],
    async () => {
      const data = await SubscriptionApis.get();
      setLocalStorageSubscription(data);
      return data;
    },
    {
      fallbackData: localStorageSubscription,
    },
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
