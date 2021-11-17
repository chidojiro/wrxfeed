/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavUtils } from '@common/hooks';
import SocialAuthButton, { AuthProvider } from '@common/atoms/SocialAuthButton';
import WrxfeedStar from '@auth/atoms/WrxfeedStar';
import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from '@src/config';
import Routes from '@src/routes';
import { useIdentity, useSetIdentity } from '@identity/hooks';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useApi } from '@api';
import { toast } from 'react-toastify';
import { ProviderName } from '@main/entity';
import { useErrorHandler, isApiError, ApiErrorCode } from '@src/error';
import NotInvited from '@auth/molecules/NotInvited';
import { useLocation } from 'react-router-dom';
import NotifyBanner from '@common/molecules/NotifyBanner';

export interface LocationState {
  fromInvite?: boolean;
  message?: string;
  from?: Location;
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
  const { fromInvite, message, from } = location.state ?? {};

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
    if (identity?.token && identity?.lastLoginAt) {
      const callbackUrl = from?.pathname || (Routes.Overview.path as string);
      redirect(callbackUrl);
    }
    if (identity?.token && !identity?.lastLoginAt) {
      redirect(Routes.Onboard.path as string);
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
    <NotInvited />
  ) : (
    <div className="flex flex-col justify-center items-center min-h-screen my-auto space-y-10">
      {fromInvite ? (
        <h2 className="text-4xl text-primary text-center font-bold mb-3">
          Join your team on Gravity.
        </h2>
      ) : (
        <div className="flex flex-col justify-center items-center">
          // <WrxfeedStar /> 
          <p className="text-[87px] font-bold whitespace-pre-line text-center -mt-6 leading-[90px]">
            {'Join your team on Gravity.'}
          </p>
        </div>
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
