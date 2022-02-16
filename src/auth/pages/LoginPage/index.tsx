/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { useNavUtils } from '@common/hooks';
import { useIdentity, useSetIdentity } from '@identity/hooks';
import { useApi } from '@api';
import { useErrorHandler, isApiError, ApiErrorCode } from '@src/error';

import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from '@src/config';
import Routes from '@src/routes';
import { ProviderName } from '@main/entity';

import SocialAuthButton, { AuthProvider } from '@common/atoms/SocialAuthButton';
import NotInvited from '@auth/molecules/NotInvited';
import NotifyBanner from '@common/molecules/NotifyBanner';

export interface LocationState {
  fromInvite?: boolean;
  message?: string;
  from?: Location;
  metadata?: any;
}

const LoginPage: React.VFC = () => {
  const { signInWithGoogle, getProfile } = useApi();
  const { redirect } = useNavUtils();
  const location = useLocation<LocationState>();
  const identity = useIdentity();
  const setIdentity = useSetIdentity();
  const errorHandler = useErrorHandler();
  const [notInvited, setNotInvited] = useState(false);
  // Variables
  const { message, from, fromInvite, metadata } = location.state ?? {};

  useEffect(() => {
    if (message) {
      NotifyBanner.info(message, {
        timeout: 3000,
        topOffset: 0,
        backgroundColor: '#374151',
      });
    }
  }, [message]);

  useEffect(() => {
    if (identity?.token) {
      const nextRoute = identity?.lastLoginAt === null ? Routes.Onboard.path : Routes.Company.path;
      const callbackUrl = from?.pathname || (nextRoute as string);
      redirect(callbackUrl);
    }
  }, [redirect, identity, from]);

  const handleResponseSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    try {
      if ('accessToken' in response) {
        const { accessToken } = response;
        const userToken = await signInWithGoogle(accessToken);
        const googleProfile = 'profileObj' in response ? response.profileObj : null;
        const userProfile = await getProfile();
        setIdentity({
          token: userToken.token,
          expireAt: userToken.expireAt,
          ...userProfile,
          provider: {
            name: ProviderName.GOOGLE,
            profile: {
              id: googleProfile?.googleId,
              email: googleProfile?.email,
              name: googleProfile?.name,
              givenName: googleProfile?.givenName,
              familyName: googleProfile?.familyName,
            },
          },
        });
      }
    } catch (error: unknown) {
      if (isApiError(error)) {
        if (error.code === ApiErrorCode.Unauthenticated) {
          setNotInvited(true);
        } else {
          await errorHandler(error);
        }
      }
    }
  };

  const handleResponseFailure = (error: any) => {
    if ('details' in error) {
      toast.error(error.details);
    } else {
      toast.error('Fail to connect your Google Account');
    }
  };

  return notInvited ? (
    <NotInvited onBack={() => setNotInvited(false)} />
  ) : (
    <div className="flex flex-col justify-center items-center min-h-screen my-auto space-y-10">
      {fromInvite ? (
        <div className="flex flex-col justify-center items-center mb-3 space-y-3 max-w-xl">
          <h2 className="text-4xl text-primary text-center font-bold">
            {`Join your ${metadata?.company?.name || ''} team on Gravity.`.replace(/\s+/g, ' ')}
          </h2>
          <p className="text-base text-Gray-6 text-center tracking-tight">
            We change the way teams approach day-to-day spend. Collaborate, analyze and identify
            inefficiencies to maximize profit. No finance hat needed.
          </p>
        </div>
      ) : (
        <h2 className="text-4xl text-primary text-center font-bold mb-3">
          Join your team on Gravity.
        </h2>
      )}
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        scope={GOOGLE_SCOPES}
        onSuccess={handleResponseSuccess}
        onFailure={handleResponseFailure}
        render={(renderProps) => (
          <SocialAuthButton
            provider={AuthProvider.GOOGLE}
            disabled={renderProps.disabled}
            onClick={renderProps.onClick}
          >
            Sign up with Google
          </SocialAuthButton>
        )}
      />
    </div>
  );
};

export default LoginPage;
