import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { CategoryApis } from './apis';
import { GetCategoriesParams } from './types';

export const useCategories = (params?: GetCategoriesParams) => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['/categories', params], () => CategoryApis.getList(params));

  return React.useMemo(
    () => ({
      categories: data,
      isInitializingCategories: isInitializing,
      isLaggingCategories: isLagging,
      isValidatingCategories: isValidating,
      mutateCategories: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
