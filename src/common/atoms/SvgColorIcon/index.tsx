import React from 'react';
import { styled } from '@mui/material/styles';
import { SvgIcon, SvgIconProps } from '@mui/material';

type SvgColorIconProps = SvgIconProps & {
  component?: React.FC;
};

const StyledSvgIcon = styled(SvgIcon)<SvgColorIconProps>(({ color, theme, width, height }) => ({
  width,
  height,
  path: {
    fill: theme.palette[color || 'primary'].main,
  },
}));

const SvgColorIcon: React.VFC<SvgColorIconProps> = (props) => {
  return <StyledSvgIcon {...props} />;
};

export default SvgColorIcon;
