import React from 'react';
import withStyles from '@mui/styles/withStyles';
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';

export const Menu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
  list: {
    padding: '4px',
  },
})((props: MuiMenuProps) => (
  <MuiMenu
    anchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    keepMounted
    elevation={0}
    {...props}
  />
));

export const MenuItem = withStyles({
  root: {
    minHeight: 0,
    lineHeight: 'normal',
    padding: '8px',
    margin: 0,
  },
})(MuiMenuItem);

export const ItemIcon = withStyles({
  root: {
    minWidth: 0,
    width: '1.25rem',
    marginRight: '0.75rem',
  },
})(MuiListItemIcon);

export const ItemText = withStyles({
  root: {
    margin: 0,
    '& .MuiListItemText-primary': {
      fontSize: '0.9375rem',
      lineHeight: 'normal',
    },
  },
})(MuiListItemText);
