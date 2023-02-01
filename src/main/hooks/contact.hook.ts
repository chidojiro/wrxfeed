import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import { USE_CONTACT_BUTTON_MESSAGE } from '@/error/errorMessages';
import { isBadRequest } from '@/error/utils';
import { InvitationApis } from '@/invitation/apis';
import { GetInvitationContactsParams } from '@/invitation/types';
import { Contact } from '@/main/entity';
import { toast } from 'react-toastify';

export function useGetContacts(filter: GetInvitationContactsParams) {
  const { data: contacts = EMPTY_ARRAY as Contact[], isInitializing: isLoading } = useFetcher(
    ['contact.hook', filter],
    () => InvitationApis.getContacts(filter),
    {
      onError: (error) => {
        if (isBadRequest(error)) {
          toast.error(USE_CONTACT_BUTTON_MESSAGE);
          return false;
        }
      },
    },
  );

  return { contacts, isLoading };
}
