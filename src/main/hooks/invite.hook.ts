import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
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
      await ApiClient.sendInvitation({ email: contact.email ?? '' });
      setLoading(false);
      setSent(true);
    } catch (error) {
      setLoading(false);
      setSent(false);
      if (isBadRequest(error)) {
        toast.error('Can not send invite!');
      } else {
        await errorHandler(error);
      }
    }
  };
  return { isSent, isLoading, sendInvitation };
}
