import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { VendorDescription } from '@main/entity';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

interface UpdateVendorHookValues {
  updateVendorById: (id: number, data: VendorDescription) => Promise<void>;
  isLoading: boolean;
}

interface VendorDescriptionModalCallback {
  onSuccess: (result: VendorDescription) => void;
  onError?: (error: unknown) => void;
}

export function useUpdateVendor(callback?: VendorDescriptionModalCallback): UpdateVendorHookValues {
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const updateVendorById = useCallback(
    async (id: number, data: VendorDescription) => {
      try {
        setLoading(true);
        await ApiClient.updateVendorById(id, data);
        callback?.onSuccess(data);
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
    },
    [ApiClient, callback, errorHandler],
  );

  return { updateVendorById, isLoading };
}
