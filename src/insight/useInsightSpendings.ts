import { useFetcher } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { GetFeedSpendingParams } from '@/feed/types';
import React from 'react';

export const useInsightSpendings = (params: GetFeedSpendingParams) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    ['useInsightSpendings', params],
    () => FeedApis.getSpending(params),
    { laggy: true },
  );

  return React.useMemo(
    () => ({
      insightSpendings: data,
      isInitializingInsightSpendings: isInitializing,
      isValidatingInsightSpendings: isValidating,
      mutateInsightSpendings: mutate,
    }),
    [data, isInitializing, isValidating, mutate],
  );
};
