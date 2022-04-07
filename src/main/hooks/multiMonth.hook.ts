import { useCallback, useEffect, useState } from 'react';
import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { PatchCalcSpendingFilters, TargetPeriod } from '@api/types';

interface MultiMonthHookValues {
  months: TargetPeriod[];
  isLoading: boolean;
}

export function useMultiMonth(filter: PatchCalcSpendingFilters): MultiMonthHookValues {
  const [months, setMonths] = useState<TargetPeriod[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getCalcSpending = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ApiClient.patchCalcSpending(filter);
      setMonths(data);
    } catch (error) {
      await errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, filter]);

  useEffect(() => {
    getCalcSpending().then();
  }, [getCalcSpending]);
  return { months, isLoading };
}
