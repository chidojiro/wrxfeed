import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import Container from '../../atoms/Container';
import { useNavUtils } from '../../hooks';

export interface SubLayoutProps {
  title: string;
  backUrl?: string;
}

const SubLayout: React.FC<SubLayoutProps> = ({ title, backUrl, children }) => {
  const { getLinkProps } = useNavUtils();
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={2}>
              <IconButton edge="start" color="inherit" size="small" {...getLinkProps(backUrl)}>
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h1" align="center" component="h1">
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container>
        <>{children}</>
      </Container>
    </>
  );
};

export default SubLayout;
