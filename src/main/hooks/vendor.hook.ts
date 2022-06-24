import { useApi } from '@/api';
import { Pagination } from '@/api/types';
import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { Vendor } from '@/main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface VendorHookValues {
  vendors: Vendor[];
  hasMore: boolean;
  isLoading: boolean;
}

export function useVendor(pagination: Pagination): VendorHookValues {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getVendors = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getVendors(pagination);
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
  }, [ApiClient, errorHandler, pagination]);

  useEffect(() => {
    getVendors().then();
  }, [getVendors]);
  return { vendors, hasMore, isLoading };
}
