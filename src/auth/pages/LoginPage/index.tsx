import React, { useEffect } from 'react';
import { useNavUtils } from '@common/hooks';
import BlankLayout from '@common/templates/BlankLayout';
import { Box, Stack, Typography } from '@mui/material';
import SocialAuthButton, { AuthProvider } from '@common/atoms/SocialAuthButton';
import WrxfeedStar from '@auth/atoms/WrxfeedStar';
import { API_BASE_URL, API_DOMAIN } from '@src/config';
import Routes from '@src/routes';
import { useIdentity } from '@identity/hooks';

const LoginPage: React.VFC = () => {
  const { redirect } = useNavUtils();
  const identity = useIdentity();

  useEffect(() => {
    if (identity?.token) {
      redirect(Routes.Home.path);
    }
  }, [redirect, identity]);

  const redirectGoogleAuth = () => {
    window.open(`${API_DOMAIN}${API_BASE_URL}/auth/google/login`, '_self');
  };

  return (
    <BlankLayout>
      <Stack
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        marginTop="6vh"
        spacing={5}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
        >
          <WrxfeedStar />
          <Typography
            fontSize="87px"
            fontWeight={600}
            whiteSpace="pre-line"
            textAlign="center"
            lineHeight="90px"
            marginTop="-24px"
          >
            {'Reach your\nfinancial goal↗'}
          </Typography>
        </Box>
        <SocialAuthButton provider={AuthProvider.GOOGLE} onClick={redirectGoogleAuth}>
          Sign up with Google
        </SocialAuthButton>
      </Stack>
    </BlankLayout>
  );
};

export default LoginPage;
