import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

export enum AuthProvider {
  GOOGLE = 'GOOGLE',
}

export interface SocialAuthButtonProps extends ButtonProps {
  provider: AuthProvider;
}

function getAuthProviderIcon(provider: AuthProvider) {
  switch (provider) {
    case AuthProvider.GOOGLE: {
      return <GoogleIcon />;
    }
    default: {
      return <GoogleIcon />;
    }
  }
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider = AuthProvider.GOOGLE,
  ...rest
}) => {
  const socialIcon = getAuthProviderIcon(provider);

  const btnProps = {
    startIcon: socialIcon,
    ...rest,
  };
  return (
    <Button
      {...btnProps}
      sx={{
        borderRadius: 24,
        textTransform: 'none',
        ...rest.sx,
      }}
    />
  );
};

export default SocialAuthButton;
