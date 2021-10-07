import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Contact } from '@main/entity';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface CommentHookValues {
  isSent: boolean;
  isLoading: boolean;
  postAddInvitation: (contact: Contact) => Promise<void>;
}

export function useInvite(): CommentHookValues {
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const postAddInvitation = async (contact: Contact) => {
    try {
      setLoading(true);
      const res = await ApiClient.postAddInvitation({ email: contact.email });
      console.log({ res });
      setLoading(false);
      setSent(true);
    } catch (error) {
      setLoading(false);
      if (isBadRequest(error)) {
        toast.error('Can not send invite!');
      } else {
        await errorHandler(error);
      }
    }
  };
  return { isSent, isLoading, postAddInvitation };
}
