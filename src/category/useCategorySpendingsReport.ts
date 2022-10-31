import { useFetcher } from '@/common/hooks';
import React from 'react';
import { CategoryApis } from './apis';
import { GetCategorySpendingsParams } from './types';

export const useCategorySpendingsReport = (id: number, params?: GetCategorySpendingsParams) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    ['useCategorySpendingsReport', id, params],
    () => CategoryApis.getSpendingsReport(id, params),
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
