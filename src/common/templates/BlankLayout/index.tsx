import React from 'react';
import { Box, BoxProps } from '@mui/material';

const BlankLayout: React.VFC<BoxProps> = ({ children, sx, ...rest }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        m: 3,
        p: 3,
        borderRadius: 6,
        backgroundColor: '#fff',
        overflow: 'scroll',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default BlankLayout;
