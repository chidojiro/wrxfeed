import React from 'react';
import { Box, CssBaseline, Drawer, Stack, Typography } from '@mui/material';
import SideMenu from './SideMenu';

const drawerWidth = 212;

export interface MainLayoutProps {
  title: string;
  boxStyle?: React.CSSProperties;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title, children, boxStyle }) => {
  return (
    <Box sx={{ display: 'flex', p: 3, height: '100vh' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'transparent',
            pl: 3,
            pr: 3,
            pt: 5,
            pb: 5,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Stack spacing={6}>
          <Typography color="white" variant="h4">
            {title}
          </Typography>
          <SideMenu />
        </Stack>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#fff', p: 4, borderRadius: 3, ...boxStyle }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
