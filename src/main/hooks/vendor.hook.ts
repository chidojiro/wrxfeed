import { useFetcher } from '@/common/hooks';
import { isBadRequest } from '@/error/utils';
import { PaginationParams } from '@/rest/types';
import { VendorApis } from '@/vendor/apis';
import { Vendor } from '@/vendor/types';
import React from 'react';
import { toast } from 'react-toastify';

interface VendorHookValues {
  vendors: Vendor[];
  hasMore: boolean;
  isLoading: boolean;
}

export function useVendor(pagination: PaginationParams): VendorHookValues {
  const [vendors, setVendors] = React.useState<Vendor[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(false);

  const { isInitializing: isLoading } = useFetcher(
    ['vendor.hook', pagination],
    async () => {
      const res = await VendorApis.getList(pagination);
      setVendors((prevTrans) => [...prevTrans, ...res]);
      setHasMore(!!res.length);
    },
    {
      onError: (error: unknown) => {
        if (isBadRequest(error)) {
          toast.error(`Failed to get any vendors`);
          return false;
        }
      },
    },
  );

  return { vendors, hasMore, isLoading };
}
