/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApi } from '@api';
import Loading from '@common/atoms/Loading';
import { useQuery } from '@common/hooks';
import { isApiError } from '@error/utils';
import Routes from '@src/routes';
import React, { useCallback, useEffect, useState, VFC } from 'react';
import { Link, useHistory } from 'react-router-dom';

const QUERY_ID = 'inviteId';

enum ErrorCode {
  UNKNOWN = 1,
  SUCCESS = 200,
  ALREADY_JOINED = 400,
  NOT_FOUND = 404,
}

interface Error {
  code: ErrorCode;
  message: string;
}

export interface LocationState {
  fromInvite?: boolean;
  message?: string;
}

const AcceptInvitation: VFC = () => {
  const { acceptInvitation } = useApi();
  const query = useQuery();
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
        await acceptInvitation(inviteId);
        // Redirect to login
        router.replace(Routes.Login.path, {
          fromInvite: true,
          message: 'Your account has been created successfully',
        });
      } catch (err: any) {
        if (isApiError(err)) {
          switch (err.code) {
            case ErrorCode.ALREADY_JOINED.valueOf(): {
              setError({ code: ErrorCode.ALREADY_JOINED, message: 'You already joined' });
              break;
            }
            case ErrorCode.NOT_FOUND.valueOf(): {
              setError({ code: ErrorCode.ALREADY_JOINED, message: 'Invitation not found' });
              break;
            }
            default: {
              setError({ code: ErrorCode.UNKNOWN, message: 'Unknown error' });
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
  }, [query, router, acceptInvitation]);

  useEffect(() => {
    acceptInvitationRequest();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      {loading ? <Loading width={80} height={80} /> : error?.message}
      {error?.code === ErrorCode.ALREADY_JOINED && (
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

export default AcceptInvitation;
