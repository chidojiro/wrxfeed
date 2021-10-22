import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import Loading from '@common/atoms/Loading';
import { classNames } from '@main/utils';

export interface LoadingButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
  loadingIndicator,
  className,
  ...rest
}) => {
  const indicator = loadingIndicator || <Loading width={16} height={16} />;
  const btnProps = {
    disabled: loading,
    ...rest,
  };
  return (
    <button
      type="button"
      className={classNames(
        'inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-sm text-white bg-purple-6 hover:bg-purple-4 focus:outline-none',
        className ?? '',
      )}
      {...btnProps}
    >
      {loading ? indicator : children}
    </button>
  );
};

export default LoadingButton;
