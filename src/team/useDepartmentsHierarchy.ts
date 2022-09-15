import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import { Department } from '@/main/entity/transaction.entity';
import React from 'react';
import { DepartmentApis } from './apis';
import { useDepartments } from './useDepartments';

export const useDepartmentsHierarchy = () => {
  const { departments, isValidatingDepartments } = useDepartments();

  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['departmentsHierarchy', departments], () =>
    Promise.all(
      departments.map(async (department) => {
        const children = await DepartmentApis.getList({ parent: department.id });

        if (!children.length) return null;

        return { ...department, children };
      }),
    ),
  );

  return React.useMemo(
    () => ({
      departmentsHierarchy: data.filter((department) => !!department) as Department[],
      isInitializingDepartments: isInitializing || isValidatingDepartments,
      isLaggingDepartments: isLagging,
      isValidatingDepartments: isValidating,
    }),
    [data, isInitializing, isLagging, isValidating, isValidatingDepartments],
  );
};
