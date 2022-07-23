import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { VendorDescription } from '@/main/entity';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { VendorApis } from '@/vendor/apis';

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
  const errorHandler = useErrorHandler();

  const updateVendorById = useCallback(
    async (id: number, data: VendorDescription) => {
      try {
        setLoading(true);
        await VendorApis.update(id, data);
        callback?.onSuccess(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (callback?.onError) {
          callback?.onError(error);
        } else if (isBadRequest(error)) {
          toast.error(error?.details?.message);
        } else {
          await errorHandler(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [callback, errorHandler],
  );

  return { updateVendorById, isLoading };
}
