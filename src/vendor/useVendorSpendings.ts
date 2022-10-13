import { useFetcher } from '@/common/hooks';
import React from 'react';
import { VendorApis } from './apis';
import { GetVendorSpendingsParams } from './types';

export const useVendorSpendings = (id: number, params?: GetVendorSpendingsParams) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    ['useVendorSpendings', id, params],
    () => VendorApis.getSpendings(id, params),
    { laggy: true },
  );

  return React.useMemo(
    () => ({
      vendorSpendings: data,
      isInitializingVendorSpendings: isInitializing,
      isValidatingVendorSpendings: isValidating,
      mutateVendorSpendings: mutate,
    }),
    [data, isInitializing, isValidating, mutate],
  );
};
