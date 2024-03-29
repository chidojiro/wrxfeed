import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import {
  BanIcon,
  DocumentSearchIcon,
  ExclamationCircleIcon,
  StatusOfflineIcon,
} from '@heroicons/react/outline';
import { ApiErrorCode } from '../../types';
import { isApiError } from '../../utils';
import { Button } from '@/common/components';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  let message = 'An error occurred in the app.';
  let icon: React.ReactElement = <ExclamationCircleIcon width={80} height={80} />;
  if (isApiError(error)) {
    switch (error.code) {
      case ApiErrorCode.NetworkError:
        message = 'Please check your internet connection.';
        icon = <StatusOfflineIcon width={80} height={80} />;
        break;

      case ApiErrorCode.Notfound:
        message = "The one you're looking for was not found.";
        icon = <DocumentSearchIcon width={80} height={80} />;
        break;

      case ApiErrorCode.Forbidden:
        message = 'Your cannot access this section right now.';
        icon = <BanIcon width={80} height={80} />;
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
      <p className="text-center">{icon}</p>
      <p className="text-center">{message}</p>
      <div>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
