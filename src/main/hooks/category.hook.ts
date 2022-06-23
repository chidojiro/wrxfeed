import { useApi } from '@/api';
import { Pagination } from '@/api/types';
import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { Category } from '@/main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CategoryHookValues {
  categories: Category[];
  hasMore: boolean;
  isLoading: boolean;
}
export function useCategory(pagination: Pagination): CategoryHookValues {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getCategories(pagination);
      setCategories((prevTrans) => [...prevTrans, ...res]);
      setHasMore(!!res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get categories');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, pagination]);

  useEffect(() => {
    getCategories().then();
  }, [getCategories]);
  return { categories, hasMore, isLoading };
}
