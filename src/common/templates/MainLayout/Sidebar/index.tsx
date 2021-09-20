import React from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link as RouterLink } from 'react-router-dom';
import { useSetIdentity } from '../../../../identity';
import { useApi } from '../../../../api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nestedList: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

const ListItemIcon = withStyles({
  root: {
    minWidth: 40,
  },
})(MuiListItemIcon);

const Sidebar: React.VFC = () => {
  const classes = useStyles();
  const setIdentity = useSetIdentity();
  const apiClient = useApi();
  const logout = React.useCallback(async () => {
    apiClient.logout();
    setIdentity(undefined);
  }, [setIdentity, apiClient]);
  return (
    <>
      <List>
        <ListItem button component={RouterLink} to="/profile">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Diary" />
          <ExpandLess />
        </ListItem>
        <List component="div" disablePadding>
          <ListItem button className={classes.nestedList} component={RouterLink} to="/">
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Activities" />
          </ListItem>
        </List>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};

export default Sidebar;
