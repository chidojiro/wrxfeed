import { GetCategoriesParams } from '@/category/types';
import { useFetcher } from '@/common/hooks';
import { Category } from '@/main/entity';
import React from 'react';
import { CategoryApis } from './../../category/apis';

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
    const res = await CategoryApis.getList(params);
    if (concatNewData && params?.limit) {
      setCategories((prevTrans) => [...prevTrans, ...res]);
    } else {
      setCategories(res);
    }
    setHasMore(!!res.length);
  });

  return { categories, hasMore, isLoading, cleanData };
}
