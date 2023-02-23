import { useFetcher } from '@/common/hooks';
import { getThisYear } from '@/common/utils/date';
import { FeedApis } from '@/feed/apis';
import { GetFeedSpendingParams } from '@/feed/types';
import React from 'react';

export const useInsightSpendings = (
  params: GetFeedSpendingParams,
  configs?: { enabled: boolean },
) => {
  const { enabled = true } = configs || {};

  const { data, isInitializing, isValidating, mutate } = useFetcher(
    enabled && ['useInsightSpendings', params],
    () => FeedApis.getSpending(params),
    { laggy: true },
  );

  const curYearSpends = React.useMemo(() => {
    return data?.filter(({ year }) => year === getThisYear()) ?? [];
  }, [data]);

  const prevYearSpends = React.useMemo(() => {
    return data?.filter(({ year }) => year === getThisYear() - 1) ?? [];
  }, [data]);

  return React.useMemo(
    () => ({
      insightSpendings: data,
      curYearSpends,
      prevYearSpends,
      isInitializingInsightSpendings: isInitializing,
      isValidatingInsightSpendings: isValidating,
      mutateInsightSpendings: mutate,
    }),
    [curYearSpends, data, isInitializing, isValidating, mutate, prevYearSpends],
  );
};
