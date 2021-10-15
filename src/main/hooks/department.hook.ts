import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Department } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface DepartmentHookValues {
  departments: Department[];
  hasMore: boolean;
  isLoading: boolean;
}
export function useDepartment(pagination: Pagination): DepartmentHookValues {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getDepartments(pagination);
      setDepartments((prevTrans) => [...prevTrans, ...res]);
      setHasMore(!!res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get departments');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, pagination]);

  useEffect(() => {
    getDepartments().then();
  }, [getDepartments]);
  return { departments, hasMore, isLoading };
}
