import React from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SubLayout from '../../../common/templates/SubLayout';

const ForgotPwdSuccessPage: React.VFC = () => {
  return (
    <SubLayout title="Done!" backUrl="/login">
      <Typography align="center" paragraph>
        <CheckCircleOutlineIcon style={{ fontSize: '5rem' }} />
      </Typography>
      <Typography align="center" paragraph variant="h2" component="h1">
        Check your inbox
      </Typography>
      <Typography align="center" paragraph>
        We&apos;ve sent you an email with instructions to reset your password.
      </Typography>
    </SubLayout>
  );
};

export default ForgotPwdSuccessPage;
