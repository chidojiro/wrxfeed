import { useHandler } from '@/common/hooks';
import { isBadRequest } from '@/error/utils';
import { VendorDescription } from '@/main/entity';
import { VendorApis } from '@/vendor/apis';
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
  const { handle: updateVendorById, isLoading } = useHandler(
    async (id: number, data: VendorDescription) => {
      await VendorApis.update(id, data);
      callback?.onSuccess(data);
    },
    {
      onError: (error: any) => {
        if (callback?.onError) {
          callback?.onError(error);
          return false;
        }
        if (isBadRequest(error)) {
          toast.error(error?.details?.message);
          return false;
        }
      },
    },
  );

  return { updateVendorById, isLoading };
}
