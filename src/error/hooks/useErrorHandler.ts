import { useSetIdentity } from '@/identity/hooks';
import React from 'react';
import { toast } from 'react-toastify';
import { useNavUtils } from '../../common/hooks';
import { ApiErrorCode, ErrorHandler } from '../types';
import { isApiError } from '../utils';

export default function useErrorHandler(): ErrorHandler {
  const { redirect } = useNavUtils();
  const setIdentity = useSetIdentity();
  return React.useCallback(
    async (error) => {
      if (!isApiError(error)) {
        toast.error('An error occurred in the app.');
        return;
      }

      // Check internet connection first
      if (!window.navigator.onLine) {
        toast.error('Please check your internet connection.');
        return;
      }

      switch (error.code) {
        case ApiErrorCode.NetworkError:
          toast.error('Please check your internet connection.');
          break;

        case ApiErrorCode.BadRequest:
          toast.error('The request sent to server is invalid.');
          break;

        case ApiErrorCode.Notfound:
          toast.error('The thing you are looking for was not found.');
          break;

        case ApiErrorCode.ServerError:
          toast.error('Our server is having an issue.');
          break;

        case ApiErrorCode.Unauthenticated:
          toast.error('Your authorization failed. Please check your account info and try again.');
          setIdentity(undefined);
          redirect('/login');
          break;

        case ApiErrorCode.Forbidden:
          toast.error('Your cannot access this section right now.');
          break;

        case ApiErrorCode.GatewayTimeout:
          toast.error('Our server did not return any response.');
          break;

        default:
          toast.error(error.details?.message);
          break;
      }
    },
    [redirect, setIdentity],
  );
}
