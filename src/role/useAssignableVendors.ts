import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { RoleApis } from './apis';

export const useAssignableVendors = () => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['useAssignableVendors'], () => RoleApis.getVendors());

  return React.useMemo(
    () => ({
      assignableVendors: data,
      isInitializingAssignableVendors: isInitializing,
      isLaggingAssignableVendors: isLagging,
      isValidatingAssignableVendors: isValidating,
      mutateAssignableVendors: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
