import React from 'react';
import { SubscriptionApis } from './apis';
import { UpdateSubscriptionPayload } from './types';
import { useSubscription } from './useSubscription';

export const useSubscribe = <T extends { id: number; name: string }>() => {
  const { subscription, mutateSubscription } = useSubscription();

  const subscribe = React.useCallback(
    (type: keyof UpdateSubscriptionPayload, item: T | T[]) => {
      mutateSubscription(
        async () => {
          const ids = [item].flat().map(({ id }) => id);
          const params = { [type]: ids };

          await SubscriptionApis.update(params);

          return { ...subscription!, [type]: [subscription?.[type] ?? [], item].flat() };
        },
        {
          optimisticData: (prev) => ({ ...prev!, [type]: [prev?.[type] ?? [], item].flat() }),
          populateCache: true,
          rollbackOnError: true,
        },
      );
    },
    [mutateSubscription, subscription],
  );

  return React.useMemo(() => ({ subscribe }), [subscribe]);
};
