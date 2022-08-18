import { useHandler } from '@/common/hooks';
import { ApiErrorCode } from '@/error/types';
import { isApiError } from '@/error/utils';
import { InvitationApis } from '@/invitation/apis';
import { Contact } from '@/main/entity';
import { useProfile } from '@/profile/useProfile';
import mixpanel from 'mixpanel-browser';
import React from 'react';
import { toast } from 'react-toastify';

interface InviteHookValues {
  isSent: boolean;
  isLoading: boolean;
  sendInvitation: (contact: Partial<Contact>) => Promise<void>;
}

export function useInvite(): InviteHookValues {
  const [isSent, setSent] = React.useState(false);
  const { profile } = useProfile();

  const { handle: sendInvitation, isLoading } = useHandler(
    async (contact: Partial<Contact>) => {
      setSent(false);
      await InvitationApis.send({ email: contact?.email ?? '' });
      mixpanel.track('Invite Sent', {
        user_id: profile?.id,
        email: profile?.email,
        company: profile?.company?.id,
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
