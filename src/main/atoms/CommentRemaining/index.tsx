import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Accent } from '@theme/colors';
import { ReactComponent as MessageTextAltIcon } from '@assets/icons/solid/message-text-alt.svg';
import SvgColorIcon from '@common/atoms/SvgColorIcon';
import { SxProps } from '@mui/system';

export interface CommentRemainingProps {
  hiddenCount: number;
  onClick?: () => void;
  sx?: SxProps;
}

const CommentRemaining: React.VFC<CommentRemainingProps> = ({ hiddenCount, onClick, sx }) => {
  return (
    <Stack
      sx={{ cursor: 'pointer', ...sx }}
      direction="row"
      spacing={0.5}
      alignItems="center"
      onClick={onClick}
    >
      <SvgColorIcon
        sx={{ marginRight: '2px' }}
        component={MessageTextAltIcon}
        color="accent"
        width={17}
        height={17}
        viewBox="0 -2 16 18"
      />
      <Typography color={Accent[2]} variant="body2" fontWeight={600}>
        {hiddenCount}
      </Typography>
      <Typography color={Accent[2]} variant="body2" fontWeight={600}>
        Show previous comments
      </Typography>
    </Stack>
  );
};

export default CommentRemaining;
