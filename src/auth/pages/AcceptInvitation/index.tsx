import Loading from '@/common/atoms/Loading';
import { useLegacyQuery } from '@/common/hooks';
import { isApiError } from '@/error/utils';
import { InvitationApis } from '@/invitation/apis';
import { Routes } from '@/routing/routes';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const QUERY_ID = 'inviteId';

enum ErrorCode {
  UNKNOWN = 1,
  SUCCESS = 200,
  INVALID_REQUEST = 400,
  NOT_FOUND = 404,
  'INV_INVITATION_ALREADY_ACCEPTED' = 'INV_INVITATION_ALREADY_ACCEPTED',
  'INV_INVITATION_EXPIRED' = 'INV_INVITATION_EXPIRED',
}

interface Error {
  code: ErrorCode;
  message: string;
}

export const AcceptInvitationPage = () => {
  const query = useLegacyQuery();
  const router = useHistory();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const acceptInvitationRequest = useCallback(async () => {
    const inviteId = query.get(QUERY_ID);
    if (!inviteId) {
      setError({ code: ErrorCode.NOT_FOUND, message: 'Invitation not found' });
      setLoading(false);
    } else {
      try {
        const result = await InvitationApis.accept(inviteId);
        // Redirect to login
        router.replace(Routes.Login.path as string, {
          fromInvite: true,
          message: 'Your account has been created successfully',
          metadata: result,
        });
      } catch (err: any) {
        if (isApiError(err)) {
          const { error: errorDetail } = err.details ?? {};

          switch (err.code) {
            case ErrorCode.INVALID_REQUEST.valueOf(): {
              if (errorDetail === ErrorCode.INV_INVITATION_ALREADY_ACCEPTED) {
                setError({
                  code: ErrorCode.INV_INVITATION_ALREADY_ACCEPTED,
                  message: 'You already joined',
                });
              } else {
                setError({
                  code: ErrorCode.INV_INVITATION_EXPIRED,
                  message: 'The invitation has already been expired',
                });
              }
              break;
            }
            case ErrorCode.NOT_FOUND.valueOf(): {
              setError({ code: ErrorCode.NOT_FOUND, message: 'Invitation not found' });
              break;
            }
          }
        } else {
          setError({ code: ErrorCode.UNKNOWN, message: 'An error occurred in the app' });
        }
      } finally {
        setLoading(false);
      }
    }
  }, [query, router]);

  useEffect(() => {
    acceptInvitationRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      {loading ? <Loading width={80} height={80} /> : error?.message}
      {error?.code === ErrorCode.INV_INVITATION_ALREADY_ACCEPTED && (
        <Link
          to="/login"
          className="my-5 px-5 py-2 bg-Gray-2 text-base text-white shadow-sm rounded-sm disabled:bg-Gray-6"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};
