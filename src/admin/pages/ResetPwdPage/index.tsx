import React from 'react';
import { Redirect } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import ResetPwdForm from '../../organisms/ResetPwdForm';
import { ResetPwdFormModel } from '../../types';
import BlankLayout from '../../../common/templates/BlankLayout';
import { useApi } from '../../../api';
import { useNavUtils, useQuery } from '../../../common/hooks';
import { isBadRequest } from '../../../error';

const ResetPwdPage: React.VFC = () => {
  const query = useQuery();
  const token = query.get('token');
  const api = useApi();
  const { redirect } = useNavUtils();
  const handleSubmit: SubmitHandler<ResetPwdFormModel> = React.useCallback(
    async (data) => {
      try {
        await api.resetPassword({
          token: token || '',
          password: data.newPassword,
        });
        toast.success('Your password has been reseted.');
        redirect('/');
      } catch (error) {
        if (isBadRequest(error)) {
          toast.success('Your reset password link is expired.');
          redirect('/');
        } else {
          throw error;
        }
      }
    },
    [api, redirect, token],
  );

  return token ? (
    <BlankLayout title="Reset password">
      <Typography paragraph>Please enter your new password in these fields below:</Typography>
      <ResetPwdForm onSubmit={handleSubmit} />
    </BlankLayout>
  ) : (
    <Redirect to="/" />
  );
};

export default ResetPwdPage;
