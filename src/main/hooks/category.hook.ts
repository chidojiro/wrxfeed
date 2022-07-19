import { useErrorHandler } from '@/error/hooks';
import { FeedApis } from '@/feed/apis';
import { GetCategoriesParams } from '@/feed/types';
import { Category } from '@/main/entity';
import { useCallback, useEffect, useState } from 'react';

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const errorHandler = useErrorHandler();

  const cleanData = () => setCategories([]);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await FeedApis.getCategories(params);
      if (concatNewData && params?.limit) {
        setCategories((prevTrans) => [...prevTrans, ...res]);
      } else {
        setCategories(res);
      }
      setHasMore(!!res.length);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [concatNewData, errorHandler, params]);

  useEffect(() => {
    getCategories().then();
  }, [getCategories]);

  return { categories, hasMore, isLoading, cleanData };
}
