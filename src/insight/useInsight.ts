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
      insight: data,
      isInitializingInsight: isInitializing,
      isValidatingInsight: isValidating,
      mutateInsight: mutate,
    }),
    [data, isInitializing, isValidating, mutate],
  );
};
