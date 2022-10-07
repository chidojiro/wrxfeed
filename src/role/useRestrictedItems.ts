import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { RoleApis } from './apis';

export const useRestrictedItems = () => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['useRestrictedItems'], () => RoleApis.getRestrictedItems());

  return React.useMemo(
    () => ({
      restrictedItems: data,
      isInitializingRestrictedItems: isInitializing,
      isLaggingRestrictedItems: isLagging,
      isValidatingRestrictedItems: isValidating,
      mutateRestrictedItems: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
