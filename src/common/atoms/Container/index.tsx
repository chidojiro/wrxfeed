import React from 'react';
import { Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import MuiContainer, { ContainerProps } from '@mui/material/Container';

const Container = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))((props: ContainerProps) => <MuiContainer maxWidth="lg" {...props} />);

export default Container;
