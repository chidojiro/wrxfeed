import React from 'react';
import { Box, CssBaseline, Drawer, Stack, Typography } from '@mui/material';
import { EssentialsBellIcon } from '@assets/';
import SideMenu from './SideMenu';

const drawerWidth = 212;

export interface MainLayoutProps {
  title: string;
  boxStyle?: React.CSSProperties;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title, children, boxStyle }) => {
  // return (
  //   <div className="flex flex-1 " style={{ backgroundColor: 'red', height: '100vh' }}>
  //     <div className="flex flex-row max-h-16">
  //       <div className="flex text-white text-semibold">Bird</div>
  //       <div className="flex flex-row">
  //         <div p-3>
  //           <EssentialsBellIcon />
  //         </div>
  //         <div className="bg-white" />
  //         <div className="flex" />
  //       </div>
  //     </div>
  //     <div>
  //     <div className="flex flex-1" style={{ ...boxStyle, backgroundColor: 'blue' }}>
  //       {children}
  //     </div>
  //   </div>
  // );
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
        <Stack spacing={6} style={{ display: 'flex', flex: 1, padding: 0 }}>
          <Typography color="white" variant="h4">
            {title}
          </Typography>
          <SideMenu />
        </Stack>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#fff',
          p: 3,
          borderRadius: 3,
          overflow: 'hidden',
          ...boxStyle,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
