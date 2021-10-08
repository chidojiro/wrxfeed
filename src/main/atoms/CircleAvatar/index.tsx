import React from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { stringAvatar } from '@common/utils';
import { SxProps } from '@mui/system';

const DEFAULT_SIZE = 32;

export interface CircleAvatarProps {
  size?: number;
  typographyProps?: TypographyProps;
  sx?: SxProps;
  name?: string;
  initialLength?: number;
  onClick?: (value?: string) => void;
}

const CircleAvatar: React.VFC<CircleAvatarProps> = ({
  size,
  typographyProps,
  sx,
  name,
  initialLength,
  onClick,
}) => {
  // Variables
  const avatarProps = stringAvatar(name || '', initialLength);

  return (
    <Tooltip title={name || ''}>
      <Avatar
        sx={{ width: size ?? DEFAULT_SIZE, height: size ?? DEFAULT_SIZE, ...avatarProps.sx, ...sx }}
        onClick={() => onClick && onClick(name)}
      >
        <Typography variant="h5" {...typographyProps}>
          {avatarProps.children}
        </Typography>
      </Avatar>
    </Tooltip>
  );
};

export default CircleAvatar;
