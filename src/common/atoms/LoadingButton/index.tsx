import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingIndicator,
  ...rest
}) => {
  // const indicator = loadingIndicator || <CircularProgress color="inherit" size={16} />;
  const btnProps = {
    disabled: loading,
    ...rest,
  };
  return <Button {...btnProps} />;
};

export default LoadingButton;
