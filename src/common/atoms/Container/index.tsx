import React from 'react';
import { Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import MuiContainer, { ContainerProps } from '@mui/material/Container';

const Container = withStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))((props: ContainerProps) => <MuiContainer maxWidth="sm" {...props} />);

export default Container;
