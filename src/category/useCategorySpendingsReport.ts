import { useFetcher } from '@/common/hooks';
import React from 'react';
import { CategoryApis } from './apis';

export const useCategorySpendingsReport = (id: number) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    ['useCategorySpendingsReport', id],
    () => CategoryApis.getSpendingsReport(id),
  );

  return React.useMemo(
    () => ({
      categorySpendingsReport: data,
      isInitializingCategorySpendingsReport: isInitializing,
      isValidatingCategorySpendingsReport: isValidating,
      mutateCategorySpendingsReport: mutate,
    }),
    [data, isInitializing, isValidating, mutate],
  );
};
