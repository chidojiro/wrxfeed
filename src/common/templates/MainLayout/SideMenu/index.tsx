import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { ListItemButton, List } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import { useSetIdentity } from '@identity';
import { useApi } from '@api';
import { styled } from '@mui/material/styles';

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
  const setIdentity = useSetIdentity();
  const apiClient = useApi();
  const logout = React.useCallback(async () => {
    apiClient.logout();
    setIdentity(undefined);
  }, [setIdentity, apiClient]);

  return (
    <>
      <List>
        <ListItemButton sx={{ padding: 0 }} component={RouterLink} to="/overview">
          <HighLight
            sx={{ visibility: location.pathname === MenuRoutes.Overview ? 'visible' : 'hidden' }}
          />
          <MenuItem primary="Overview" />
        </ListItemButton>
        <ListItemButton sx={{ padding: 0 }} component={RouterLink} to="/discussions">
          <HighLight
            sx={{ visibility: location.pathname === MenuRoutes.Discussions ? 'visible' : 'hidden' }}
          />
          <StyledBadge badgeContent={2} color="error">
            <MenuItem primary="Discussions" />
          </StyledBadge>
        </ListItemButton>
        <ListItemButton sx={{ padding: 0 }} onClick={logout}>
          <HighLight sx={{ visibility: 'hidden' }} />
          <MenuItem primary="Logout" />
        </ListItemButton>
      </List>
    </>
  );
};

export default SideMenu;
