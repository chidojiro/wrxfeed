import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { RoleApis } from './apis';

export const useAssignableDepartments = () => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['useAssignableDepartments'], () => RoleApis.getDepartments());

  return React.useMemo(
    () => ({
      assignableDepartments: data,
      isInitializingAssignableDepartments: isInitializing,
      isLaggingAssignableDepartments: isLagging,
      isValidatingAssignableDepartments: isValidating,
      mutateAssignableDepartments: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
