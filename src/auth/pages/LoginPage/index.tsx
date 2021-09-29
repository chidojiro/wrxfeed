import React, { useEffect } from 'react';
import { useNavUtils } from '@common/hooks';
import BlankLayout from '@common/templates/BlankLayout';
import { Box, Stack, Typography } from '@mui/material';
import SocialAuthButton, { AuthProvider } from '@common/atoms/SocialAuthButton';
import WrxfeedStar from '@auth/atoms/WrxfeedStar';
import { GOOGLE_CLIENT_ID } from '@src/config';
import Routes from '@src/routes';
import { useIdentity, useSetIdentity } from '@identity/hooks';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useApi } from '@api';
import { toast } from 'react-toastify';
import { ProviderName } from '@main/entity';
import { useErrorHandler } from '@src/error';

const LoginPage: React.VFC = () => {
  const { signInWithGoogle } = useApi();
  const { redirect } = useNavUtils();
  const identity = useIdentity();
  const setIdentity = useSetIdentity();
  const errorHandler = useErrorHandler();

  useEffect(() => {
    if (identity?.token) {
      redirect(Routes.Home.path);
    }
  }, [redirect, identity]);

  const handleResponseSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    try {
      if ('accessToken' in response) {
        const { accessToken } = response;
        const userToken = await signInWithGoogle(accessToken);
        const userProfile = 'profileObj' in response ? response.profileObj : null;
        setIdentity({
          token: userToken.token,
          expireAt: userToken.expireAt,
          fullName: userProfile?.name,
          email: userProfile?.email,
          provider: {
            name: ProviderName.GOOGLE,
            profile: {
              id: userProfile?.googleId,
              email: userProfile?.email,
              name: userProfile?.name,
              givenName: userProfile?.givenName,
              familyName: userProfile?.familyName,
            },
          },
        });
      }
    } catch (error: any) {
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
