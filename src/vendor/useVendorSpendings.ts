import { useFetcher } from '@/common/hooks';
import { getThisYear } from '@/common/utils/date';
import React from 'react';
import { VendorApis } from './apis';
import { GetVendorSpendingsParams } from './types';

export const useVendorSpendings = (id: number, params?: GetVendorSpendingsParams) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    ['useVendorSpendings', id, params],
    () => VendorApis.getSpendings(id, params),
    { laggy: true },
  );

  const curYearSpends = React.useMemo(() => {
    return data?.filter(({ year }) => year === getThisYear()) ?? [];
  }, [data]);

  const prevYearSpends = React.useMemo(() => {
    return data?.filter(({ year }) => year === getThisYear() - 1) ?? [];
  }, [data]);

  return React.useMemo(
    () => ({
      vendorSpendings: data,
      curYearSpends,
      prevYearSpends,
      isInitializingVendorSpendings: isInitializing,
      isValidatingVendorSpendings: isValidating,
      mutateVendorSpendings: mutate,
    }),
    [curYearSpends, data, isInitializing, isValidating, mutate, prevYearSpends],
  );
};
