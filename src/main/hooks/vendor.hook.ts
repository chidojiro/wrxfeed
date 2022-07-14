import { UseFetcherConfiguration } from '@/common/hooks';
import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { PaginationParams } from '@/rest/types';
import { VendorApis } from '@/vendor/apis';
import { Vendor } from '@/vendor/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface VendorHookValues {
  vendors: Vendor[];
  hasMore: boolean;
  isLoading: boolean;
}

export function useVendor(pagination: PaginationParams): VendorHookValues {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const errorHandler = useErrorHandler();

  const getVendors = useCallback(async () => {
    try {
      setLoading(true);
      const res = await VendorApis.getList(pagination);
      setVendors((prevTrans) => [...prevTrans, ...res]);
      setHasMore(!!res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get vendors');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [errorHandler, pagination]);

  useEffect(() => {
    getVendors().then();
  }, [getVendors]);
  return { vendors, hasMore, isLoading };
}
