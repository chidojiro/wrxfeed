import { GravityLogoImage } from '@/assets';
import { AuthApis } from '@/auth/apis';
import NotInvited from '@/auth/molecules/NotInvited';
import { AuthUtils } from '@/auth/utils';
import SocialAuthButton, { AuthProvider } from '@/common/atoms/SocialAuthButton';
import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES, GRADIENT_DEFAULT } from '@/config';
import { NotifyBanner } from '@/layout/NotifyBanner';
import mixpanel from 'mixpanel-browser';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export interface LocationState {
  fromInvite?: boolean;
  message?: string;
  from?: Location;
  metadata?: any;
}

export const LoginPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [notInvited, setNotInvited] = useState(false);
  // Variables
  const { message, fromInvite, metadata } = location.state ?? {};

  useEffect(() => {
    if (message) {
      NotifyBanner.info(message, {
        timeout: 3000,
        topOffset: 0,
        backgroundColor: '#374151',
      });
    }
  }, [message]);

  const handleResponseSuccess = async (response: any) => {
    console.log(response);
    if ('access_token' in response) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { access_token } = response;
      const userToken = await AuthApis.signInWithGoogle(access_token);
      const googleProfile = 'profileObj' in response ? response.profileObj : null;

      AuthUtils.setToken(userToken.token);

      mixpanel.track('Log In', {
        user_id: googleProfile?.googleId,
        email: googleProfile?.email,
      });

      history.push('/dashboard/all-company');
    }
  };

  const client = (window as any).google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: GOOGLE_SCOPES,
    callback: handleResponseSuccess,
  });

  return notInvited ? (
    <NotInvited onBack={() => setNotInvited(false)} />
  ) : (
    <div className="flex flex-col justify-center items-center min-h-screen my-auto space-y-10">
      {fromInvite ? (
        <div className="flex flex-col justify-center items-center mb-3 space-y-8 max-w-xl">
          <GravityLogoImage />
          <div className="flex flex-col items-center mx-4 xl:w-[921px] overflow-hidden rounded-2.5xl bg-white drop-shadow-login-card">
            <div
              className="h-4 w-full rounded-t-card"
              style={{
                background: GRADIENT_DEFAULT,
              }}
            />
            <div className="flex flex-col items-center pt-6 lg:pt-12 xl:pt-[68px] pb-8 lg:pb-14 xl:pb-[84px] space-y-4 sm:space-y-8 lg:space-y-10 xl:space-y-20 sm:px-6 px-8 lg:px-16 xl:px-40">
              <div className="flex flex-col space-y-4 max-w-[563px]">
                <h2 className="text-4xl text-primary text-center font-bold">
                  {`Join the ${metadata?.company?.name || ''} team on Gravity.`.replace(
                    /\s+/g,
                    ' ',
                  )}
                </h2>
                <p className="text-base text-Gray-3 text-center tracking-tight">
                  Gravity empowers teams at fast-moving companies to see,
                  <br />
                  track and target more efficient spending.
                </p>
              </div>
              <SocialAuthButton provider={AuthProvider.GOOGLE} onClick={client.requestAccessToken}>
                Sign in with Google
              </SocialAuthButton>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-4xl text-primary text-center font-bold mb-3">
            Join your team on Gravity.
          </h2>
          <SocialAuthButton
            provider={AuthProvider.GOOGLE}
            onClick={() => client.requestAccessToken()}
          >
            Sign up with Google
          </SocialAuthButton>
        </>
      )}
    </div>
  );
};
