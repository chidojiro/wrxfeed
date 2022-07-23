import { useFetcher } from '@/common/hooks';
import { useParams } from 'react-router-dom';
import { DepartmentApis } from './apis';

export const useTopCategories = (id?: number) => {
  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = id ?? +departmentIdParam;

  return useFetcher(['topCategories', departmentId], () =>
    DepartmentApis.getTopCategories(departmentId),
  );
};
