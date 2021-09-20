import React from 'react';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingFallback: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height={200}>
      <Fade in unmountOnExit>
        <CircularProgress />
      </Fade>
    </Box>
  );
};

export default LoadingFallback;
