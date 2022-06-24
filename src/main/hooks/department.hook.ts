import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useApi } from '@/api';
import { Pagination, DepartmentFilter } from '@/api/types';
import { useErrorHandler } from '@/error/hooks';

import { isBadRequest, isApiError } from '@/error/utils';
import { Department } from '@/main/entity';

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
  findDepartmentById: (id: number) => Department | null;
  isRootDepartment: (id: number) => boolean;
  onClear: () => void;
}

export function useDepartment(filters: DepartmentFilter): DepartmentHookValues {
  const [departments, setDepartments] = useState<DepartmentSection[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const onClear = () => setDepartments([]);

  const getDepartments = useCallback(async () => {
    try {
      setLoading(true);
      console.log('hook getDepartments');
      const res = await ApiClient.getDepartments(filters);
      if (res.length) {
        const childrenData = await Promise.all(
          res.map((dept) => ApiClient.getDepartments({ parent: dept.id, ...DEPT_PAGINATION })),
        );
        const sectionData: DepartmentSection[] = res.map((dept, idx) => ({
          ...dept,
          children: childrenData[idx],
        }));
        if (filters?.offset) {
          setDepartments((prevTrans) => [...prevTrans, ...sectionData]);
        } else {
          setDepartments(sectionData);
        }
      }
      if (filters.offset === 0 && res.length === 0) {
        setDepartments([]);
      }
      setHasMore(!!res.length);
    } catch (error: unknown) {
      if (isApiError(error)) {
        toast.error(error?.details?.message);
      } else if (isBadRequest(error)) {
        toast.error('Can not get departments');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, filters]);

  const findDepartmentById = useCallback(
    (id: number): Department | null => {
      // eslint-disable-next-line no-restricted-syntax
      for (const rootDept of departments) {
        if (rootDept.id === id) {
          return rootDept;
        }
        const childDept = rootDept.children.find((child) => child.id === id);
        if (childDept) {
          return childDept;
        }
      }
      return null;
    },
    [departments],
  );

  const isRootDepartment = useCallback(
    (id: number): boolean => {
      return departments.some((root) => root.id === id);
    },
    [departments],
  );

  useEffect(() => {
    getDepartments().then();
  }, [getDepartments]);

  return { departments, hasMore, isLoading, findDepartmentById, isRootDepartment, onClear };
}
