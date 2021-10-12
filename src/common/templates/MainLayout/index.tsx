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
    <div className="flex flex-1" style={{ backgroundColor: 'red', height: '100vh' }}>
      <div className="flex flex-1" style={{ ...boxStyle, backgroundColor: 'blue' }}>
        {children}
      </div>
      <button
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Button text
      </button>
    </div>
  );
  // return (
  //   <Box sx={{ display: 'flex', p: 3, height: '100vh' }}>
  //     <CssBaseline />
  //     <Drawer
  //       sx={{
  //         width: drawerWidth,
  //         flexShrink: 0,
  //         '& .MuiDrawer-paper': {
  //           width: drawerWidth,
  //           boxSizing: 'border-box',
  //           bgcolor: 'transparent',
  //           pl: 3,
  //           pr: 3,
  //           pt: 5,
  //           pb: 5,
  //         },
  //       }}
  //       variant="permanent"
  //       anchor="left"
  //     >
  //       <Stack spacing={6} style={{ display: 'flex', flex: 1, padding: 0 }}>
  //         <Typography color="white" variant="h4">
  //           {title}
  //         </Typography>
  //         <SideMenu />
  //       </Stack>
  //     </Drawer>
  //     <Box
  //       component="main"
  //       sx={{
  //         flexGrow: 1,
  //         bgcolor: '#fff',
  //         p: 3,
  //         borderRadius: 3,
  //         overflow: 'hidden',
  //         ...boxStyle,
  //       }}
  //     >
  //       {children}
  //     </Box>
  //   </Box>
  // );
};

export default MainLayout;
