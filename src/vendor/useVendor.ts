import { useFetcher, UseFetcherConfiguration } from '@/common/hooks';
import { VendorApis } from './apis';

export const useVendor = (id: number, options?: UseFetcherConfiguration) => {
  return useFetcher(['vendor', id], () => VendorApis.get(id), options);
};
