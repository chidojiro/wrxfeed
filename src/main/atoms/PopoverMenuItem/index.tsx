import React from 'react';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { Highlight, Gray } from '@theme/colors';

interface PopoverMenuItemProps extends ListItemProps {
  key: string;
  label: string;
  onClick: () => void;
}

const PopoverMenuItem: React.VFC<PopoverMenuItemProps> = ({ key, label, onClick, ...rest }) => {
  return (
    <ListItem key={key} disablePadding {...rest}>
      <ListItemButton sx={{ ':hover': { backgroundColor: Highlight } }} onClick={onClick}>
        <Typography component="span" variant="h5" fontWeight={400} color={Gray[2]}>
          {label}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default PopoverMenuItem;
