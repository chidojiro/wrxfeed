import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Department } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DEPT_PAGINATION: Pagination = {
  limit: 100,
  offset: 0,
};

export type DepartmentSection = Department & {
  children: Department[];
};

interface DepartmentHookValues {
  departments: DepartmentSection[];
  hasMore: boolean;
  isLoading: boolean;
}
export function useDepartment(pagination: Pagination): DepartmentHookValues {
  const [departments, setDepartments] = useState<DepartmentSection[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getDepartments(pagination);
      // Get children of department
      if (res.length) {
        const childrenData = await Promise.all(
          res.map((dept) => ApiClient.getDepartments({ parent: dept.id, ...DEPT_PAGINATION })),
        );
        const sectionData: DepartmentSection[] = res.map((dept, idx) => ({
          ...dept,
          children: childrenData[idx],
        }));
        setDepartments((prevTrans) => [...prevTrans, ...sectionData]);
      }
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
