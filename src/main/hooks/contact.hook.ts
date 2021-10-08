import { useApi } from '@api';
import { GetContactsFilter } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Contact } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface ContactsHookValues {
  contacts: Contact[];
  hasMore: boolean;
  isLoading: boolean;
}

export function useGetContacts(filter: GetContactsFilter): ContactsHookValues {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getContacts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getContacts(filter);
      if (filter.pagination?.offset) {
        setContacts((prevTrans) => [...prevTrans, ...res]);
      } else {
        setContacts(res);
      }
      setHasMore(!!res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get contacts by text');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, filter]);

  useEffect(() => {
    getContacts().then();
  }, [getContacts]);
  return { contacts, hasMore, isLoading };
}
