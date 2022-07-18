import { useFetcher } from '@/common/hooks';
import { FeedApis } from './apis';
import { GetCategoriesParams } from './types';

export const useCategories = (params?: GetCategoriesParams) => {
  return useFetcher(['/categories', params], () => FeedApis.getCategories(params));
};
