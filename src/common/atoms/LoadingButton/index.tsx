import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import Loading from '@common/atoms/Loading';

export interface LoadingButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
  loadingIndicator,
  ...rest
}) => {
  const indicator = loadingIndicator || <Loading width={16} height={16} />;
  const btnProps = {
    disabled: loading,
    ...rest,
  };
  return (
    <button type="button" {...btnProps}>
      {loading ? indicator : children}
    </button>
  );
};

export default LoadingButton;
