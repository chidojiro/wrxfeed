import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { VendorApis } from './apis';
import { GetVendorsParams } from './types';

export const useVendors = (params?: GetVendorsParams) => {
  const {
    data = EMPTY_ARRAY,
    isInitializing,
    isLagging,
    isValidating,
    mutate,
  } = useFetcher(['vendors', params], () => VendorApis.getList(params));

  return React.useMemo(
    () => ({
      vendors: data,
      isInitializingVendors: isInitializing,
      isLaggingVendors: isLagging,
      isValidatingVendors: isValidating,
      mutateVendors: mutate,
    }),
    [data, isInitializing, isLagging, isValidating, mutate],
  );
};
