import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LoginFormModel } from '../../types';
import LoginForm from '../../organisms/LoginForm';
import { useErrorHandler, isBadRequest } from '../../../error';
import { useApi } from '../../../api';
import { useSetIdentity } from '../../../identity';
import { useNavUtils } from '../../../common/hooks';
import BlankLayout from '../../../common/templates/BlankLayout';

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
    <BlankLayout title="Sign In">
      <LoginForm onSubmit={handleSubmit} />
    </BlankLayout>
  );
};

export default LoginPage;
