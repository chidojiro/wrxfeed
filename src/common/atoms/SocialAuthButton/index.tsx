import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ReactComponent as GoogleLogo } from '@/assets/icons/google-logo.svg';
import clsx from 'clsx';
import { Button } from '@/common/components';

export enum AuthProvider {
  GOOGLE = 'GOOGLE',
}

export interface SocialAuthButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  provider: AuthProvider;
}

function getAuthProviderIcon(provider: AuthProvider) {
  switch (provider) {
    case AuthProvider.GOOGLE: {
      return <GoogleLogo width={23} height={23} />;
    }
    default: {
      return <></>;
    }
  }
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  children,
  provider = AuthProvider.GOOGLE,
  className = '',
  ref,
  ...rest
}) => {
  const socialIcon = getAuthProviderIcon(provider);

  return (
    <Button
      className={clsx(
        'flex justify-center items-center space-x-3 px-10 h-14 bg-primary text-base text-white rounded disabled:opacity-50',
        className,
      )}
      ref={ref as any}
      {...rest}
    >
      {socialIcon}
      <div>{children}</div>
    </Button>
  );
};

export default SocialAuthButton;
