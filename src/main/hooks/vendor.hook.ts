import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Vendor, VendorDescription } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface VendorHookValues {
  vendors: Vendor[];
  updateVendorById: (id: number, data: VendorDescription) => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
}

interface VendorDescriptionModalCallback {
  onSuccess: () => void;
  onError?: (error: unknown) => void;
}

export function useVendor(
  pagination: Pagination,
  callback?: VendorDescriptionModalCallback,
): VendorHookValues {
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

  const updateVendorById = async (id: number, data: VendorDescription) => {
    try {
      setLoading(true);
      await ApiClient.updateVendorById(id, data);
      callback?.onSuccess();
    } catch (error) {
      if (callback?.onError) {
        callback?.onError(error);
      } else if (isBadRequest(error)) {
        toast.error('Could not save Vendor description!');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVendors().then();
  }, [getVendors]);
  return { vendors, updateVendorById, hasMore, isLoading };
}
