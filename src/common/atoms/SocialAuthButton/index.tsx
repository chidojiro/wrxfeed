import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ReactComponent as GoogleLogo } from '@assets/icons/google-logo.svg';

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
  ...rest
}) => {
  const socialIcon = getAuthProviderIcon(provider);

  return (
    <button
      type="button"
      className="flex justify-center items-center space-x-3 px-6 sm:w-[23rem] h-16 bg-Gray-3 text-xl text-white rounded-sm disabled:opacity-50"
      {...rest}
    >
      {socialIcon}
      <div>{children}</div>
    </button>
  );
};

export default SocialAuthButton;
