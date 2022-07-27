import { InvitationApis } from '@/invitation/apis';
import { ApiErrorCode } from '@/error/types';
import { isApiError } from '@/error/utils';
import { Contact } from '@/main/entity';
import { toast } from 'react-toastify';
import mixpanel from 'mixpanel-browser';
import { useIdentity } from '@/identity/hooks';
import { useHandler } from '@/common/hooks';
import React from 'react';

interface InviteHookValues {
  isSent: boolean;
  isLoading: boolean;
  sendInvitation: (contact: Partial<Contact>) => Promise<void>;
}

export function useInvite(): InviteHookValues {
  const [isSent, setSent] = React.useState(false);
  const identity = useIdentity();

  const { handle: sendInvitation, isLoading } = useHandler(
    async (contact: Partial<Contact>) => {
      setSent(false);
      await InvitationApis.send({ email: contact?.email ?? '' });
      mixpanel.track('Invite Sent', {
        user_id: identity?.id,
        email: identity?.email,
        company: identity?.company?.id,
      });
      setSent(true);
    },
    {
      onError: (error: unknown) => {
        if (isApiError(error)) {
          if (error.code === ApiErrorCode.BadRequest) {
            toast.error(error.details?.message);
            return false;
          }
        }
      },
    },
  );

  return { isSent, isLoading, sendInvitation };
}
