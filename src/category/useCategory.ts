import { useFetcher } from '@/common/hooks';
import { CategoryApis } from './apis';

export const useCategory = (id?: number) => {
  return useFetcher(!!id && ['category', id], () => CategoryApis.get(id!));
};
