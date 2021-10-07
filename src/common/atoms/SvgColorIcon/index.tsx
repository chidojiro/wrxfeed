import React from 'react';
import { styled } from '@mui/material/styles';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { CSSProperties } from '@mui/system';

type SvgColorIconProps = SvgIconProps & {
  component?: React.FC;
  pathstyle?: CSSProperties;
};

const StyledSvgIcon = styled(SvgIcon)<SvgColorIconProps>(
  ({ color, theme, width, height, pathstyle }) => ({
    width,
    height,
    path: pathstyle || {
      fill: theme.palette[color || 'primary'].main,
    },
  }),
);

const SvgColorIcon: React.VFC<SvgColorIconProps> = (props) => {
  return <StyledSvgIcon sx={{ width: 'auto', height: 'auto' }} {...props} />;
};

export default SvgColorIcon;
