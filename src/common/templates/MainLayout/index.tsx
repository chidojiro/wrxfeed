import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import ScrollOnClick from '../../atoms/ScrollOnClick';
import HideOnScroll from '../../atoms/HideOnScroll';
import Container from '../../atoms/Container';
import Sidebar from './Sidebar';

const useStyles = makeStyles(() =>
  createStyles({
    drawerPaper: {
      width: 200,
    },
    drawerToolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    topBtn: {
      backgroundColor: 'transparent',
    },
  }),
);

export interface MainLayoutProps {
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title, children }) => {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = React.useCallback(() => {
    setDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar variant="dense">
            <Grid container alignItems="center" spacing={0}>
              <Grid item xs={2}>
                <IconButton edge="start" color="inherit" size="small" onClick={handleDrawerToggle}>
                  <MenuIcon />
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
      </HideOnScroll>
      <Toolbar variant="dense" id="back-to-top-anchor" />
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          // Better open performance on mobile.
          keepMounted: true,
        }}
      >
        <Toolbar variant="dense" className={classes.drawerToolbar}>
          <IconButton size="small" onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Sidebar />
      </Drawer>
      <Container>
        <>{children}</>
      </Container>
      <ScrollOnClick anchorSelector="#back-to-top-anchor">
        <Fab color="inherit" size="small" className={classes.topBtn}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollOnClick>
    </>
  );
};

export default MainLayout;
