import React, { useEffect, useState } from 'react';
import { useNavUtils } from '@common/hooks';
import BlankLayout from '@common/templates/BlankLayout';
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

const LoginPage: React.VFC = () => {
  const { signInWithGoogle, getProfile } = useApi();
  const { redirect } = useNavUtils();
  const identity = useIdentity();
  const setIdentity = useSetIdentity();
  const errorHandler = useErrorHandler();
  const [notInvited, setNotInvited] = useState(false);

  useEffect(() => {
    if (identity?.token && identity?.lastLoginAt) {
      redirect(Routes.Overview.path);
    }
    if (identity?.token && !identity?.lastLoginAt) {
      redirect(Routes.Onboard.path);
    }
  }, [redirect, identity]);

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
    <BlankLayout>
      <div className="flex flex-col justify-center items-center mt-[6vh] space-y-10">
        <div className="flex flex-col justify-center items-center">
          <WrxfeedStar />
          <p className="text-[87px] font-bold whitespace-pre-line text-center -mt-6 leading-[90px]">
            {'Reach your\nfinancial goal↗'}
          </p>
        </div>
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
    </BlankLayout>
  );
};

export default LoginPage;
