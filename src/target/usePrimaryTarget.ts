import { useFetcher } from '@/common/hooks';
import { DateUtils } from '@/common/utils';
import React from 'react';
import { TargetApis } from './apis';
import { fallbackTarget } from './constants';

export const usePrimaryTarget = (departmentId: number) => {
  const fetcherReturn = useFetcher(['primaryTarget', departmentId], () =>
    TargetApis.getList({
      year: DateUtils.getThisYear(),
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
