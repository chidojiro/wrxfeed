import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { RoleApis } from './apis';

export const useAssignableCategories = () => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['useAssignableCategories'], () => RoleApis.getCategories());

  return React.useMemo(
    () => ({
      assignableCategories: data,
      isInitializingAssignableCategories: isInitializing,
      isLaggingAssignableCategories: isLagging,
      isValidatingAssignableCategories: isValidating,
      mutateAssignableCategories: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
