import React, { useEffect, useState, VFC } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SvgColorIcon from '@common/atoms/SvgColorIcon';
import { ReactComponent as TickCircle } from '@assets/icons/solid/tick-circle.svg';
import { Green } from '@theme/colors';
import { styled, SxProps } from '@mui/system';
import { Slide } from '@mui/material';

const DEFAULT_TIMEOUT = 1500;

interface HiddenTransactionBannerProps extends StackProps {
  sx?: SxProps;
  container?: Element;
  message: string;
  closeIn?: number;
}

const Container = styled(Stack)(() => ({
  backgroundColor: Green[12],
  width: '100%',
  height: '37px',
  justifyContent: 'center',
  alignItems: 'center',
}));

const TransactionNotifyBanner: VFC<HiddenTransactionBannerProps> = ({
  container,
  message,
  closeIn,
  ...rest
}) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setTimeout(() => setVisible(false), closeIn || DEFAULT_TIMEOUT);
    }
  }, [message, closeIn]);

  return (
    <Slide
      style={{ position: 'absolute', zIndex: 1000 }}
      direction="down"
      in={isVisible}
      container={container}
    >
      <Container direction="row" spacing={1} {...rest}>
        <SvgColorIcon component={TickCircle} pathstyle={{ fill: Green[1] }} viewBox="0 0 15 15" />
        <Typography fontSize="0.875em" fontWeight={400} color={Green[1]} component="span">
          {message}
        </Typography>
      </Container>
    </Slide>
  );
};

export default React.memo(TransactionNotifyBanner);
