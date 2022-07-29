import { useFetcher } from '@/common/hooks';
import { USE_CONTACT_BUTTON_MESSAGE } from '@/error/errorMessages';
import { isBadRequest } from '@/error/utils';
import { InvitationApis } from '@/invitation/apis';
import { GetInvitationContactsParams } from '@/invitation/types';
import { Contact } from '@/main/entity';
import React from 'react';
import { toast } from 'react-toastify';

interface ContactsHookValues {
  contacts: Contact[];
  hasMore: boolean;
  isLoading: boolean;
}

export function useGetContacts(filter: GetInvitationContactsParams): ContactsHookValues {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [hasMore, setHasMore] = React.useState(false);

  const { isInitializing: isLoading } = useFetcher(
    ['contact.hook', filter],
    async () => {
      const res = await InvitationApis.getContacts(filter);
      if (filter.offset) {
        setContacts((prevTrans) => [...prevTrans, ...res]);
      } else {
        setContacts(res);
      }
      setHasMore(!!res.length);
    },
    {
      onError: (error) => {
        if (isBadRequest(error)) {
          toast.error(USE_CONTACT_BUTTON_MESSAGE);
          return false;
        }
      },
    },
  );

  return { contacts, hasMore, isLoading };
}
