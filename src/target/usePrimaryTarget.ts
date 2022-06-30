import { useFetcher } from '@/common/hooks';
import { TargetApis } from '@/target/apis';
import React from 'react';
import { useParams } from 'react-router-dom';

export const usePrimaryTarget = (id?: number) => {
  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = id ?? +departmentIdParam;

  const fetcherReturn = useFetcher(['primaryTarget', departmentId], () =>
    TargetApis.getList({
      year: new Date().getFullYear(),
      offset: 0,
      limit: 1,
      isPrimary: 1,
      dep: departmentId,
    }),
  );

  return React.useMemo(
    () => ({
      ...fetcherReturn,
      data: fetcherReturn.data?.[0],
    }),
    [fetcherReturn],
  );
};
