import React from 'react';
import { ButtonProps, SvgIcon, Button } from '@mui/material';
import { ReactComponent as GoogleLogo } from '@assets/icons/google-logo.svg';
import { Gray } from '@theme/colors';

export enum AuthProvider {
  GOOGLE = 'GOOGLE',
}

export interface SocialAuthButtonProps extends ButtonProps {
  provider: AuthProvider;
}

function getAuthProviderIcon(provider: AuthProvider) {
  switch (provider) {
    case AuthProvider.GOOGLE: {
      return <SvgIcon component={GoogleLogo} width={23} height={23} sx={{ mr: 1 }} />;
    }
    default: {
      return <SvgIcon component={GoogleLogo} />;
    }
  }
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider = AuthProvider.GOOGLE,
  sx,
  ...rest
}) => {
  const socialIcon = getAuthProviderIcon(provider);

  return (
    <Button
      startIcon={socialIcon}
      variant="outlined"
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        borderColor: Gray[1],
        color: Gray[1],
        fontSize: '1.5em',
        fontWeight: 400,
        width: 459,
        height: 72,
        ...sx,
      }}
      {...rest}
    />
  );
};

export default SocialAuthButton;
