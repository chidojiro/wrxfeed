import { useFetcher } from '@/common/hooks';
import React from 'react';
import { ProfileApis } from './apis';
import { GetUsersParams } from './types';

export const useUsers = (params?: GetUsersParams) => {
  const { data, isInitializing, isLagging, isValidating, mutate } = useFetcher(['users'], () =>
    ProfileApis.getUsers(params),
  );

  return React.useMemo(
    () => ({
      users: data,
      isInitializingUsers: isInitializing,
      isLaggingUsers: isLagging,
      isValidatingUsers: isValidating,
      mutateUsers: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
