import { useCallback, useEffect, useState } from 'react';

import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { Vendor } from '@main/entity';

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
      await errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, pagination]);

  useEffect(() => {
    getVendors().then();
  }, [getVendors]);
  return { vendors, hasMore, isLoading };
}
