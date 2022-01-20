import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { ApiErrorCode } from '@error/types';
import { isApiError } from '@error/utils';
import { Contact } from '@main/entity';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface InviteHookValues {
  isSent: boolean;
  isLoading: boolean;
  sendInvitation: (contact: Partial<Contact>) => Promise<void>;
}

export function useInvite(): InviteHookValues {
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const sendInvitation = async (contact: Partial<Contact>) => {
    try {
      setLoading(true);
      await ApiClient.sendInvitation({ email: contact?.email ?? '' });
      setSent(true);
    } catch (error: unknown) {
      setSent(false);
      if (isApiError(error)) {
        if (error.code === ApiErrorCode.BadRequest) {
          toast.error(error.details?.message);
        } else {
          errorHandler(error);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return { isSent, isLoading, sendInvitation };
}
