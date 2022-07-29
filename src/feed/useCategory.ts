import { useFetcher } from '@/common/hooks';
import { FeedApis } from './apis';

export const useCategory = (id?: number) => {
  return useFetcher(!!id && ['category', id], () => FeedApis.getCategory(id!));
};
