import { InsightApis } from './apis';
import { useFetcher } from '@/common/hooks';
import React from 'react';

export const useInsight = (id: number) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    !!id && ['useInsight', id],
    () => InsightApis.get(id),
    { laggy: true },
  );

  return React.useMemo(
    () => ({
      insight: data
        ? {
            ...data,
            dateRange:
              data.dateRange === 'custom' && data.from && data.to
                ? [new Date(data.from), new Date(data.to)]
                : data.dateRange,
          }
        : undefined,
      isInitializingInsight: isInitializing,
      isValidatingInsight: isValidating,
      mutateInsight: mutate,
    }),
    [data, isInitializing, isValidating, mutate],
  );
};
