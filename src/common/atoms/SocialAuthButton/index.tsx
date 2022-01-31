import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ReactComponent as GoogleLogo } from '@assets/icons/google-logo.svg';
import { classNames } from '@common/utils';

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
  ...rest
}) => {
  const socialIcon = getAuthProviderIcon(provider);

  return (
    <button
      type="button"
      className={classNames(
        'flex justify-center items-center space-x-3 px-20 h-16 bg-primary text-xl text-white rounded-sm disabled:opacity-50',
        className,
      )}
      {...rest}
    >
      {socialIcon}
      <div>{children}</div>
    </button>
  );
};

export default SocialAuthButton;
