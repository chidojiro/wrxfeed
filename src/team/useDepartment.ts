import { DepartmentApis } from '@/team/apis';
import { useFetcher } from '@/common/hooks';

export const useDepartment = (id: number) => {
  return useFetcher(['department', id], () => DepartmentApis.get(id));
};
