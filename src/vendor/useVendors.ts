import { useFetcher } from '@/common/hooks';
import { VendorApis } from './apis';
import { GetVendorsParams } from './types';

export const useVendors = (params: GetVendorsParams) => {
  return useFetcher(['vendors'], () => VendorApis.getList(params));
};
