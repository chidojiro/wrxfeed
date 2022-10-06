import { DepartmentApis } from '@/team/apis';
import { useFetcher } from '@/common/hooks';
import { ApiErrorCode, isApiError } from '@/error';

export const useDepartment = (id: number) => {
  return useFetcher(
    ['department', id],
    () => {
      return DepartmentApis.get(id);
    },
    {
      onError: (error) => {
        if (error.code === ApiErrorCode.Forbidden) {
          return false;
        }
      },
    },
  );
};
