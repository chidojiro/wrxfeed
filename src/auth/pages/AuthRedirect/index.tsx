import { useApi } from '@api';
import { useNavUtils, useQuery } from '@common/hooks';
import useCookie from '@common/hooks/useCookie';
import { UserToken } from '@identity/types';
import { LinearProgress } from '@mui/material';
import Routes from '@src/routes';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthRedirect: React.VFC = () => {
  const apiClient = useApi();
  const query = useQuery();
  const { redirect } = useNavUtils();
  const { cookies } = useCookie();

  const getUserToken = useCallback(async () => {
    try {
      const userToken: UserToken = await apiClient.signInWithGoogle({
        prompt: query.get('prompt'),
        authuser: query.get('authuser'),
        code: query.get('code'),
        scope: query.get('scope'),
      });
      if (userToken.token) {
        cookies.set('token', userToken.token);
        redirect(Routes.Home.path);
      } else {
        toast.error('Fail to verify Google Account');
        redirect(Routes.Login.path);
      }
    } catch (e) {
      toast.error('Fail to verify Google Account');
      redirect(Routes.Login.path);
    }
  }, [query, apiClient, redirect, cookies]);

  useEffect(() => {
    getUserToken();
  }, [getUserToken]);

  return <LinearProgress color="primary" />;
};

export default AuthRedirect;
