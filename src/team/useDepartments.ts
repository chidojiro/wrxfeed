import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { DepartmentApis } from './apis';
import { GetDepartmentsParams } from './types';

export const useDepartments = (params?: GetDepartmentsParams) => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['useDepartments', params], () => DepartmentApis.getList(params));

  return React.useMemo(
    () => ({
      departments: data,
      isInitializingDepartments: isInitializing,
      isLaggingDepartments: isLagging,
      isValidatingDepartments: isValidating,
      mutateDepartments: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
