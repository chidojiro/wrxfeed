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
      return <GoogleLogo width={23} height={23} className="mr-2" />;
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
      className="flex justify-center items-center text-2xl w-[459px] h-[72px] text-Gray-1 border border-Gray-1 rounded-sm disabled:opacity-50"
      {...rest}
    >
      {socialIcon}
      {children}
    </button>
  );
};

export default SocialAuthButton;
