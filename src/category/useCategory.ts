import { useFetcher } from '@/common/hooks';
import { ApiErrorCode } from '@/error';
import { CategoryApis } from './apis';

export const useCategory = (id?: number) => {
  return useFetcher(!!id && ['category', id], () => CategoryApis.get(id!), {
    onError: (error) => {
      if (error.code === ApiErrorCode.Forbidden) {
        return false;
      }
    },
  });
};
