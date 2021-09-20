import React from 'react';
import MuiChip, { ChipProps } from '@mui/material/Chip';
import withStyles from '@mui/styles/withStyles';

const Chip = withStyles({
  root: {
    borderRadius: '3px',
    color: '#fff',
  },
  labelSmall: {
    padding: '2px 6px',
  },
  sizeSmall: {
    height: 'auto',
    fontSize: '0.6875rem',
  },
})((props: ChipProps) => <MuiChip size="small" {...props} />);

export default Chip;
