import React from 'react';

import { ReactComponent as StarSvg } from '@assets/images/star.svg';
import { Box, Typography } from '@mui/material';
import { BoxProps } from '@mui/material/node_modules/@mui/system';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '225.28px',
  height: '220.58px',
  position: 'relative',
});

const WrxfeedStar: React.VFC<BoxProps> = (props) => {
  return (
    <Container {...props}>
      <StarSvg />
      <Typography sx={{ position: 'absolute', transform: 'rotate(15deg)' }} variant="h3">
        Gravity
      </Typography>
    </Container>
  );
};

export default WrxfeedStar;
