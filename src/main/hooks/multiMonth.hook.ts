import { useCallback, useEffect, useState } from 'react';
import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { TargetProp, PatchCalcSpendingFilters, TargetPeriod } from '@api/types';

interface MultiMonthHookValues {
  months: TargetPeriod[];
  isLoading: boolean;
  fetch: () => Promise<void>;
}

export function useMultiMonth(
  filter: PatchCalcSpendingFilters,
  isLazy?: boolean,
): MultiMonthHookValues {
  const [months, setMonths] = useState<TargetPeriod[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getCalcSpending = useCallback(
    async (preProps?: TargetProp[]) => {
      if (preProps && preProps.length > 0) {
        // eslint-disable-next-line no-param-reassign
        filter.props = preProps;
      }
      if (filter.props.length === 0) {
        return;
      }
      try {
        setLoading(true);
        const data = await ApiClient.patchCalcSpending(filter);
        setMonths(data);
      } catch (error) {
        await errorHandler(error);
      } finally {
        setLoading(false);
      }
    },
    [ApiClient, errorHandler, filter],
  );

  useEffect(() => {
    if (!isLazy) {
      getCalcSpending().then();
    }
  }, [getCalcSpending, isLazy]);
  return { months, isLoading, fetch: getCalcSpending };
}
