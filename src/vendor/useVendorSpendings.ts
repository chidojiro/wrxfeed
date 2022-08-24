import { useFetcher } from '@/common/hooks';
import React from 'react';
import { VendorApis } from './apis';

export const useVendorSpendings = (id: number) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    ['useVendorSpendings', id],
    () => VendorApis.getSpendings(id),
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
