import { useApi } from '@/api';
import { useFetcher } from '@/common/hooks/useFetcher';
import React from 'react';

export const usePrimaryTarget = () => {
  const api = useApi();

  const fetcherReturn = useFetcher('primaryTarget', () =>
    api.getTargets({ year: new Date().getFullYear(), offset: 0, limit: 1, isPrimary: 1 }),
  );

  return React.useMemo(
    () => ({
      ...fetcherReturn,
      data: fetcherReturn.data?.[0],
    }),
    [fetcherReturn],
  );
};
