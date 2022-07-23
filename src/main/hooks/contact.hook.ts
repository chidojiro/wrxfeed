import { USE_CONTACT_BUTTON_MESSAGE } from '@/error/errorMessages';
import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { InvitationApis } from '@/invitation/apis';
import { GetInvitationContactsParams } from '@/invitation/types';
import { Contact } from '@/main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ContactsHookValues {
  contacts: Contact[];
  hasMore: boolean;
  isLoading: boolean;
}

export function useGetContacts(filter: GetInvitationContactsParams): ContactsHookValues {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const errorHandler = useErrorHandler();

  const getContacts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await InvitationApis.getContacts(filter);
      if (filter.offset) {
        setContacts((prevTrans) => [...prevTrans, ...res]);
      } else {
        setContacts(res);
      }
      setHasMore(!!res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error(USE_CONTACT_BUTTON_MESSAGE);
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [errorHandler, filter]);

  useEffect(() => {
    getContacts().then();
  }, [getContacts]);
  return { contacts, hasMore, isLoading };
}
