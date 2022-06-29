import { useApi } from '@/api';
import { useFetcher } from '@/common/hooks/useFetcher';
import React from 'react';
import { useParams } from 'react-router-dom';

export const usePrimaryTarget = (id?: number) => {
  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = id ?? +departmentIdParam;

  const api = useApi();

  const fetcherReturn = useFetcher(['primaryTarget', departmentId], () =>
    api.getTargets({
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
