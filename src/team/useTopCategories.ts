import { useApi } from '@/api';
import { useFetcher } from '@/common/hooks';
import { useParams } from 'react-router-dom';

export const useTopCategories = (id?: number) => {
  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = id ?? +departmentIdParam;

  const api = useApi();

  return useFetcher(['topCategories', departmentId], () => api.getTopCategories(departmentId));
};
