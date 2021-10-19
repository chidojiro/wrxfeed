import React, { useEffect } from 'react';
import { useNavUtils } from '@common/hooks';
import BlankLayout from '@common/templates/BlankLayout';
import { Box, Stack, Typography } from '@mui/material';
import SocialAuthButton, { AuthProvider } from '@common/atoms/SocialAuthButton';
import WrxfeedStar from '@auth/atoms/WrxfeedStar';
import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from '@src/config';
import Routes from '@src/routes';
import { useIdentity, useSetIdentity } from '@identity/hooks';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useApi } from '@api';
import { toast } from 'react-toastify';
import { ProviderName } from '@main/entity';
import { useErrorHandler } from '@src/error';

const LoginPage: React.VFC = () => {
  const { signInWithGoogle, getProfile } = useApi();
  const { redirect } = useNavUtils();
  const identity = useIdentity();
  const setIdentity = useSetIdentity();
  const errorHandler = useErrorHandler();

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
      await errorHandler(error);
    }
  };

  const handleResponseFailure = (error: any) => {
    if ('details' in error) {
      toast.error(error.details);
    } else {
      toast.error('Fail to connect your Google Account');
    }
  };

  return (
    <BlankLayout>
      <Stack
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        marginTop="6vh"
        spacing={5}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
        >
          <WrxfeedStar />
          <Typography
            fontSize="87px"
            fontWeight={600}
            whiteSpace="pre-line"
            textAlign="center"
            lineHeight="90px"
            marginTop="-24px"
          >
            {'Reach your\nfinancial goal↗'}
          </Typography>
        </Box>
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
      </Stack>
    </BlankLayout>
  );
};

export default LoginPage;
