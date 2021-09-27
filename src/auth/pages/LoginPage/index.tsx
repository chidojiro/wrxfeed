import React from 'react';
// import { SubmitHandler } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { LoginFormModel } from '@auth/types';
// import LoginForm from '@auth/organisms/LoginForm';
// import { useApi } from '@api';
// import { useSetIdentity } from '@identity';
// import { useErrorHandler, isBadRequest } from '@error';
// import { useNavUtils } from '@common/hooks';
import BlankLayout from '@common/templates/BlankLayout';
import { Box, Stack, Typography } from '@mui/material';
// import { useAuthStateContext } from '@api/containers/AuthProvider';
// import { User } from 'firebase/auth';
import SocialAuthButton, { AuthProvider } from '@common/atoms/SocialAuthButton';
import WrxfeedStar from '@auth/atoms/WrxfeedStar';
import GoogleLogin from 'react-google-login';

const clientId = '656098091361-44il4b6fo4551uhrcce0ti16kn75t2um.apps.googleusercontent.com';

const LoginPage: React.VFC = () => {
  // const authState = useAuthStateContext();

  // const api = useApi();
  // const setIdentity = useSetIdentity();
  // const { redirect } = useNavUtils();
  // const handleError = useErrorHandler();
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

  // const responseGoogle = (response) => {
  //   console.log(response);
  // };

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
          clientId={clientId}
          // onSuccess={responseGoogle}
          // onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
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
