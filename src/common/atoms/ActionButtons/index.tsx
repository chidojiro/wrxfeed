import { styled } from '@mui/material/styles';

/**
 * Buttons container
 */
const ActionButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gridColumnGap: theme.spacing(2),
}));

export default ActionButtons;
