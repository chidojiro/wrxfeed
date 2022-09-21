import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { AdminApis } from './apis';

export const useRoles = () => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['roles'], () => AdminApis.getRoles());

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
