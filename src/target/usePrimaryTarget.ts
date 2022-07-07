import { useFetcher } from '@/common/hooks';
import { TargetApis } from '@/target/apis';
import React from 'react';
import { fallbackTarget } from './constants';

export const usePrimaryTarget = (departmentId: number) => {
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
      data: fetcherReturn.data?.[0] ?? fallbackTarget,
    }),
    [fetcherReturn],
  );
};
