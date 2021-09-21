import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LoginFormModel } from '@auth/types';
import LoginForm from '@auth/organisms/LoginForm';
import { useApi } from '@api';
import { useSetIdentity } from '@identity';
import { useErrorHandler, isBadRequest } from '@error';
import { useNavUtils } from '@common/hooks';
import BlankLayout from '@common/templates/BlankLayout';
import { Stack } from '@mui/material';
import SocialAuthButton, { AuthProvider } from '@/common/atoms/SocialAuthButton';

const LoginPage: React.VFC = () => {
  const api = useApi();
  const setIdentity = useSetIdentity();
  const { redirect } = useNavUtils();
  const handleError = useErrorHandler();
  const handleSubmit: SubmitHandler<LoginFormModel> = React.useCallback(
    async (data) => {
      try {
        const identity = await api.login(data);
        setIdentity(identity);
        redirect('/');
      } catch (error) {
        if (isBadRequest(error)) {
          toast.error('Wrong email or password.');
        } else {
          handleError(error);
        }
      }
    },
    [api, setIdentity, redirect, handleError],
  );

  return (
    <BlankLayout title="WrxFeed Sign In" sx={{ marginTop: '20vh' }}>
      <Stack spacing={4}>
        <LoginForm onSubmit={handleSubmit} />
        <SocialAuthButton provider={AuthProvider.GOOGLE} variant="outlined" fullWidth>
          Continue with Google
        </SocialAuthButton>
      </Stack>
    </BlankLayout>
  );
};

export default LoginPage;
