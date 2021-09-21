import React from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import SubLayout from '../../../common/templates/SubLayout';
import ActionButtons from '../../../common/atoms/ActionButtons';

const ResetPwdSuccessPage: React.VFC = () => {
  return (
    <SubLayout title="Password Changed">
      <Typography align="center" paragraph>
        <CheckCircleOutlineIcon style={{ fontSize: '5rem' }} />
      </Typography>
      <Typography align="center" paragraph>
        Your password has been updated. Click the button below to continue.
      </Typography>
      <ActionButtons>
        <Button color="primary" variant="contained" component={RouterLink} to="/login">
          Continue
        </Button>
      </ActionButtons>
    </SubLayout>
  );
};

export default ResetPwdSuccessPage;
