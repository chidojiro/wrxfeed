import React from 'react';
import { SubscriptionApis } from './apis';
import { UpdateSubscriptionPayload } from './types';
import { useSubscription } from './useSubscription';

export const useUnsubscribe = <T extends { id: number; name: string }>() => {
  const { subscription, mutateSubscription } = useSubscription();

  const unsubscribe = React.useCallback(
    (type: keyof UpdateSubscriptionPayload, item: T | T[]) => {
      mutateSubscription(
        async () => {
          const ids = [item].flat().map(({ id }) => id);
          const params = { [type]: ids };
          await SubscriptionApis.delete(params);
          return {
            ...subscription,
            [type]: ((subscription?.[type] ?? []) as T[]).filter(({ id }) => {
              const itemIds = [item].flat().map(({ id }) => id);

              return !itemIds.includes(id);
            }),
          };
        },
        {
          optimisticData: (prev) => ({
            ...prev,
            [type]: ((prev?.[type] ?? []) as T[]).filter(({ id }) => {
              const itemIds = [item].flat().map(({ id }) => id);

              return !itemIds.includes(id);
            }),
          }),
          populateCache: true,
          rollbackOnError: true,
        },
      );
    },
    [mutateSubscription, subscription],
  );

  return React.useMemo(() => ({ unsubscribe }), [unsubscribe]);
};
