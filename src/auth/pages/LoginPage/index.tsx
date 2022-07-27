import { AuthApis } from '@/auth/apis';
import NotInvited from '@/auth/molecules/NotInvited';
import { AuthUtils } from '@/auth/utils';
import SocialAuthButton, { AuthProvider } from '@/common/atoms/SocialAuthButton';
import { useNavUtils } from '@/common/hooks';
import NotifyBanner from '@/common/molecules/NotifyBanner';
import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from '@/config';
import { useProfile } from '@/profile/useProfile';
import { Routes } from '@/routing/routes';
import mixpanel from 'mixpanel-browser';
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface LocationState {
  fromInvite?: boolean;
  message?: string;
  from?: Location;
  metadata?: any;
}

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { redirect } = useNavUtils();
  const location = useLocation<LocationState>();
  const { data: profile } = useProfile();
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
    if (AuthUtils.getToken()) {
      const nextRoute = profile?.lastLoginAt === null ? Routes.Onboard.path : Routes.Dashboard.path;
      const callbackUrl = from?.pathname || (nextRoute as string);
      redirect(callbackUrl);
    }
  }, [redirect, from, profile?.lastLoginAt]);

  const handleResponseSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if ('accessToken' in response) {
      const { accessToken } = response;
      const userToken = await AuthApis.signInWithGoogle(accessToken);
      const googleProfile = 'profileObj' in response ? response.profileObj : null;

      AuthUtils.setToken(userToken.token);

      mixpanel.track('Log In', {
        user_id: googleProfile?.googleId,
        email: googleProfile?.email,
      });

      history.push('/dashboard/all-company');
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
