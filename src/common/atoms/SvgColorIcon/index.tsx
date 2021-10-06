import React from 'react';
import { styled } from '@mui/material/styles';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { CSSProperties } from '@mui/system';

type SvgColorIconProps = SvgIconProps & {
  component?: React.FC;
  pathStyle?: CSSProperties;
};

const StyledSvgIcon = styled(SvgIcon)<SvgColorIconProps>(
  ({ color, theme, width, height, pathStyle }) => ({
    width,
    height,
    path: pathStyle || {
      fill: theme.palette[color || 'primary'].main,
    },
  }),
);

const SvgColorIcon: React.VFC<SvgColorIconProps> = (props) => {
  return <StyledSvgIcon sx={{ width: 'auto', height: 'auto' }} {...props} />;
};

export default SvgColorIcon;
