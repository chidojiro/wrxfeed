import React from 'react';
// import { SubmitHandler } from 'react-hook-form';
// import { LoginFormModel } from '@auth/types';
// import LoginForm from '@auth/organisms/LoginForm';
// import { useApi } from '@api';
import { useSetIdentity } from '@identity';
import { useErrorHandler, isBadRequest } from '@error';
import { useNavUtils } from '@common/hooks';
import BlankLayout from '@common/templates/BlankLayout';
import { Box, Stack, Typography } from '@mui/material';
// import { useAuthStateContext } from '@api/containers/AuthProvider';
// import { User } from 'firebase/auth';
import SocialAuthButton, { AuthProvider } from '@common/atoms/SocialAuthButton';
import WrxfeedStar from '@auth/atoms/WrxfeedStar';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import { GOOGLE_CLIENT_ID } from '@src/config';
// import { Identity } from '@identity/types';
// import { GoogleAuth } from '@auth/types';

const LoginPage: React.VFC = () => {
  // const apiClient = useApi();
  const setIdentity = useSetIdentity();
  const { redirect } = useNavUtils();
  const handleError = useErrorHandler();
  // const handleSubmit: SubmitHandler<LoginFormModel> = React.useCallback(
  //   async (data) => {
  //     try {
  //       const identity = await api.login(data);
  //       setIdentity(identity);
  //       redirect('/');
  //     } catch (error) {
  //       if (isBadRequest(error)) {
  //         toast.error('Wrong email or password.');
  //       } else {
  //         handleError(error);
  //       }
  //     }
  //   },
  //   [api, setIdentity, redirect, handleError],
  // );

  // const onSignInWithGoogle = (user: User | null | undefined) => {
  //   if (user) {
  //     redirect('/');
  //   }
  // };

  const responseGoogleSuccess = async (response: any) => {
    try {
      // const data: GoogleAuth = {
      //   prompt: 'consent',
      //   authuser: response.profileObj?.email,
      //   scope: 'openid profile email',
      //   code: response.accessToken,
      // };
      // const userToken = await apiClient.signInWithGoogle(data);
      setIdentity({
        displayName: response.profileObj?.name,
        email: response.profileObj?.email,
        avatar: response.profileObj?.imageUrl,
        token: response.tokenObj?.access_token,
        expireAt: response.tokenObj?.expires_at,
      });
      redirect('/');
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('This google account is invalid.');
      } else {
        handleError(error);
      }
    }
  };

  const responseGoogleFailure = (error: any) => {
    toast.error(error.details);
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
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy="single_host_origin"
          prompt="consent"
          isSignedIn
          render={(renderProps) => (
            <SocialAuthButton
              provider={AuthProvider.GOOGLE}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
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
