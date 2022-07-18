import { useFetcher } from '@/common/hooks';
import { DepartmentApis } from './apis';
import { GetDepartmentsParams } from './types';

export const useDepartments = (params?: GetDepartmentsParams) => {
  return useFetcher(['departments', params], () => DepartmentApis.getList(params));
};
