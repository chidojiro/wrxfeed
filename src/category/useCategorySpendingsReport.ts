import { useFetcher } from '@/common/hooks';
import { GetVendorSpendingsParams } from '@/vendor/types';
import React from 'react';
import { CategoryApis } from './apis';

export const useCategorySpendingsReport = (id: number, params?: GetVendorSpendingsParams) => {
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
