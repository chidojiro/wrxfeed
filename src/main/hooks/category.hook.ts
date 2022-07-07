import { useCallback, useEffect, useState } from 'react';
import { useApi } from '@/api';
import { CategoryFilter } from '@/api/types';
import { useErrorHandler } from '@/error/hooks';
import { Category } from '@/main/entity';

export interface UseCategoryParams {
  filter?: CategoryFilter;
  concatNewData?: boolean;
}

interface CategoryHookValues {
  categories: Category[];
  hasMore: boolean;
  isLoading: boolean;
  cleanData: () => void;
}

export function useCategory({
  filter,
  concatNewData = true,
}: UseCategoryParams): CategoryHookValues {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const cleanData = () => setCategories([]);

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getCategories(filter);
      if (concatNewData && filter?.limit) {
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
  }, [ApiClient, concatNewData, errorHandler, filter]);

  useEffect(() => {
    getCategories().then();
  }, [getCategories]);

  return { categories, hasMore, isLoading, cleanData };
}
