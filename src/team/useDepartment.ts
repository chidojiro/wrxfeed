import { useApi } from '@/api';
import { useFetcher } from '@/common/hooks';

export const useDepartment = (id?: number) => {
  const api = useApi();

  return useFetcher(!!id && ['department', id], () => api.getDepartmentById(id ?? 0));
};
