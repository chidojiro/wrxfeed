import { useFetcher } from '@/common/hooks';
import { DepartmentApis } from './apis';
import { GetTopCategoriesParams } from './types';

export const useTopCategories = (departmentId: number, params?: GetTopCategoriesParams) => {
  return useFetcher(
    ['topCategories', departmentId, params],
    () => DepartmentApis.getTopCategories(departmentId, params),
    { laggy: true },
  );
};
