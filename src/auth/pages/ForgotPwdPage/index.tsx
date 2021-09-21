import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import ForgotPwdForm from '../../organisms/ForgotPwdForm';
import { ForgotPwdFormModel } from '../../types';
import SubLayout from '../../../common/templates/SubLayout';
import { useApi } from '../../../api';
import { useNavUtils } from '../../../common/hooks';

const ForgotPwdPage: React.VFC = () => {
  const api = useApi();
  const { redirect } = useNavUtils();
  const handleSubmit: SubmitHandler<ForgotPwdFormModel> = React.useCallback(
    async (data) => {
      await api.forgotPassword(data);
      redirect('/forgot-pwd/success');
    },
    [api, redirect],
  );

  return (
    <SubLayout title="Forgot password" backUrl="/login">
      <Typography align="center" paragraph>
        Please enter your registered email so you can reset your password.
      </Typography>
      <ForgotPwdForm onSubmit={handleSubmit} />
    </SubLayout>
  );
};

export default ForgotPwdPage;
