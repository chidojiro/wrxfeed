import React from 'react';
import List from '@mui/material/List';
import Popover, { PopoverProps } from '@mui/material/Popover';

const PopoverMenu: React.FC<PopoverProps> = ({ children, ...rest }) => {
  return (
    <Popover
      PaperProps={{
        sx: { borderRadius: '4px', overflow: 'hidden' },
      }}
      sx={{
        top: 10,
      }}
      elevation={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted={false}
      {...rest}
    >
      <List>{children}</List>
    </Popover>
  );
};

export default PopoverMenu;
