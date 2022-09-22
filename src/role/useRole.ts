import { AssertUtils } from './../common/utils/assert';
import { useFetcher } from '@/common/hooks';
import { AssertUtils } from '@/common/utils';
import React from 'react';
import { RoleApis } from './apis';

export const useRole = (id: number) => {
  const { data, isInitializing, isLagging, isValidating, mutate } = useFetcher(
    !AssertUtils.isNullOrUndefined(id) && ['useRole', id],
    () => RoleApis.get(id),
  );

  return React.useMemo(
    () => ({
      role: data,
      isInitializingRole: isInitializing,
      isLaggingRole: isLagging,
      isValidatingRole: isValidating,
      mutateRole: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
