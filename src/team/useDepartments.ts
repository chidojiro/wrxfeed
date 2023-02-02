import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import { isBadRequest } from '@/error';
import React from 'react';
import { toast } from 'react-toastify';
import { DepartmentApis } from './apis';
import { GetDepartmentsParams } from './types';

export const useDepartments = (params?: GetDepartmentsParams) => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['useDepartments', params], () => DepartmentApis.getList(params), {
    onError: (error) => {
      if (isBadRequest(error)) {
        toast.error(`Failed to get departments`);
        return false;
      }
    },
  });

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
