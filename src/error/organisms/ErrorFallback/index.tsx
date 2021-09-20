import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import BlockIcon from '@mui/icons-material/Block';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FallbackProps } from 'react-error-boundary';
import ActionButtons from '../../../common/atoms/ActionButtons';
import { ApiErrorCode } from '../../types';
import { isApiError } from '../../utils';

const ErrorFallback: React.VFC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  let message = 'An error occurred in the app.';
  let icon: React.ReactElement = <WarningIcon style={{ fontSize: '5rem' }} />;
  if (isApiError(error)) {
    switch (error.code) {
      case ApiErrorCode.NetworkError:
        message = 'Please check your internet connection.';
        icon = <CloudOffIcon style={{ fontSize: '5rem' }} />;
        break;

      case ApiErrorCode.Notfound:
        message = "The one you're looking for was not found.";
        icon = <SearchIcon style={{ fontSize: '5rem' }} />;
        break;

      case ApiErrorCode.Unauthorized:
        message = 'Your cannot access this section right now.';
        icon = <BlockIcon style={{ fontSize: '5rem' }} />;
        break;

      case ApiErrorCode.ServerError:
        message = 'An error occurred while processing your request.';
        break;

      case ApiErrorCode.GatewayTimeout:
        message = 'Our server did not have any response.';
        break;

      default:
        break;
    }
  }
  return (
    <div role="alert">
      <Typography align="center" paragraph>
        {icon}
      </Typography>
      <Typography align="center" paragraph component="div">
        {message}
      </Typography>
      <ActionButtons>
        <Button color="primary" variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </ActionButtons>
    </div>
  );
};

export default ErrorFallback;
