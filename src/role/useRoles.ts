import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { RoleApis } from './apis';

export const useRoles = () => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['useRoles'], () => RoleApis.getList());

  return React.useMemo(
    () => ({
      roles: data,
      isInitializingRoles: isInitializing,
      isLaggingRoles: isLagging,
      isValidatingRoles: isValidating,
      mutateRoles: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
