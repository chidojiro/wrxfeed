import { styled } from '@mui/material/styles';
import { SvgIcon, SvgIconProps } from '@mui/material';

type SvgColorIconProps = SvgIconProps & {
  component?: React.FC;
};

const SvgColorIcon = styled(SvgIcon)<SvgColorIconProps>(({ color, theme }) => ({
  path: {
    fill: theme.palette[color || 'primary'].main,
  },
}));

export default SvgColorIcon;
