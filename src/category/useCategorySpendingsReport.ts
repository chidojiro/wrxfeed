import { useFetcher } from '@/common/hooks';
import { getThisYear } from '@/common/utils/date';
import React from 'react';
import { CategoryApis } from './apis';
import { GetCategorySpendingsParams } from './types';

export const useCategorySpendingsReport = (id: number, params?: GetCategorySpendingsParams) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    !!id && !!params && ['useCategorySpendingsReport', id, params],
    () => CategoryApis.getSpendingsReport(id, params),
  );

  const curYearSpends = React.useMemo(() => {
    return data?.filter(({ year }) => year === getThisYear()) ?? [];
  }, [data]);

  const prevYearSpends = React.useMemo(() => {
    return data?.filter(({ year }) => year === getThisYear() - 1) ?? [];
  }, [data]);

  return React.useMemo(
    () => ({
      categorySpendingsReport: data,
      curYearSpends,
      prevYearSpends,
      isInitializingCategorySpendingsReport: isInitializing,
      isValidatingCategorySpendingsReport: isValidating,
      mutateCategorySpendingsReport: mutate,
    }),
    [curYearSpends, data, isInitializing, isValidating, mutate, prevYearSpends],
  );
};
