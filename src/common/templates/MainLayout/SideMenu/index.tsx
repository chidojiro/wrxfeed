import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { ListItemButton, List } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import { useSetIdentity } from '@identity';
import { useApi } from '@api';
import { styled } from '@mui/material/styles';
import { ReactComponent as LogoutIcon } from '@assets/icons/outline/logout.svg';
// import { ReactComponent as UploadIcon } from '@assets/icons/outline/upload.svg';
// import { useSetRecoilState } from 'recoil';
// import { showUploadCSVModalState } from '@main/organisms/UploadCSVModal/states';
import { GoogleLogout } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '@src/config';

enum MenuRoutes {
  Overview = '/overview',
  Discussions = '/discussions',
}

const HighLight = styled('div')(({ theme }) => ({
  width: '4px',
  height: '10px',
  borderRadius: 3,
  backgroundColor: theme.palette.highlight.main,
  marginRight: '12px',
}));

// const ActionIcon = styled('img')(({ theme, icon }) => ({
//   width: '20px',
//   height: '20px',
//   backgroundColor: theme.palette.highlight.main,
//   marginRight: '8px',
// }));

export type ActionIconProps = {
  style?: React.CSSProperties;
  icon: string;
};

// const ActionIcon: React.FC<ActionIconProps> = ({ style, icon }) => (
//   <img
//     alt="ActionIcon"
//     style={{
//       display: 'flex',
//       color: '#273240',
//       fontSize: 14,
//       fontWeight: 'bold',
//       lineHeight: '18px',
//       margin: 0,
//       ...style,
//     }}
//     src={icon}
//   />
// );

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -20,
    top: 15,
    borderRadius: 5,
    fontSize: '0.75em',
    minWidth: 17,
    height: 17,
  },
}));

const MenuItem = styled(ListItemText)<ListItemTextProps>(() => ({
  color: 'white',
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
    fontSize: '0.875em',
  },
}));

const SideMenu: React.VFC = () => {
  const location = useLocation();
  // const setOpenUploadCSVModal = useSetRecoilState(showUploadCSVModalState);
  const setIdentity = useSetIdentity();
  const apiClient = useApi();
  const logout = React.useCallback(async () => {
    apiClient.logout();
    setIdentity(undefined);
  }, [setIdentity, apiClient]);
  // const uploadCSV = () => setOpenUploadCSVModal(true);
  return (
    <>
      <List style={{}}>
        <ListItemButton sx={{ padding: 0 }} component={RouterLink} to="/overview">
          <HighLight
            sx={{ visibility: location.pathname === MenuRoutes.Overview ? 'visible' : 'hidden' }}
          />
          <MenuItem primary="All Company" />
        </ListItemButton>
        <ListItemButton sx={{ padding: 0 }} component={RouterLink} to="/discussions">
          <HighLight
            sx={{ visibility: location.pathname === MenuRoutes.Discussions ? 'visible' : 'hidden' }}
          />
          <StyledBadge badgeContent={2} color="error">
            <MenuItem primary="Inbox" />
          </StyledBadge>
        </ListItemButton>
      </List>
      <List style={{ marginTop: 'auto' }}>
        {/* <ListItemButton sx={{ padding: 0 }} onClick={uploadCSV}>
          <UploadIcon style={{ marginRight: 5 }} />
          <MenuItem primary="Upload CSV" />
        </ListItemButton> */}
        {/* <ListItemButton sx={{ padding: 0, marginTop: '50px' }} onClick={logout}>
          <LogoutIcon style={{ marginRight: 5 }} />
          <MenuItem primary="Logout" />
        </ListItemButton> */}
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          onLogoutSuccess={logout}
          render={(logoutProps) => (
            <ListItemButton
              sx={{ padding: 0, marginTop: '50px' }}
              disabled={logoutProps.disabled}
              onClick={logoutProps.onClick}
            >
              <LogoutIcon style={{ marginRight: 5 }} />
              <MenuItem primary="Logout" />
            </ListItemButton>
          )}
        />
      </List>
    </>
  );
};

export default SideMenu;
