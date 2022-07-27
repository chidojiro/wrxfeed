import { useFetcher } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { GetCategoriesParams } from '@/feed/types';
import { Category } from '@/main/entity';
import React from 'react';

export interface UseCategoryParams {
  params?: GetCategoriesParams;
  concatNewData?: boolean;
}

interface CategoryHookValues {
  categories: Category[];
  hasMore: boolean;
  isLoading: boolean;
  cleanData: () => void;
}

export function useCategory({
  params,
  concatNewData = true,
}: UseCategoryParams): CategoryHookValues {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(false);

  const cleanData = () => setCategories([]);

  const { isInitializing: isLoading } = useFetcher(['category.hook', params], async () => {
    const res = await FeedApis.getCategories(params);
    if (concatNewData && params?.limit) {
      setCategories((prevTrans) => [...prevTrans, ...res]);
    } else {
      setCategories(res);
    }
    setHasMore(!!res.length);
  });

  return { categories, hasMore, isLoading, cleanData };
}
