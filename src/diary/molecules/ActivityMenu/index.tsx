import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IconButton from '@mui/material/IconButton';
import { Activity } from '../../types';
import { ItemIcon, ItemText, Menu, MenuItem } from '../../../common/atoms/ContextMenu';
import { useNavUtils } from '../../../common/hooks';
import DeleteActivityMenuItem from '../../containers/DeleteActivityMenuItem';

export interface ActivityMenuProps {
  activity: Activity;
}

const ActivityMenu: React.VFC<ActivityMenuProps> = ({ activity }) => {
  const { getLinkProps } = useNavUtils();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick: React.MouseEventHandler = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem {...getLinkProps(`/activities/edit/${activity.id}`)}>
          <ItemIcon>
            <BorderColorIcon fontSize="small" />
          </ItemIcon>
          <ItemText primary="Update" />
        </MenuItem>
        <DeleteActivityMenuItem activity={activity} closeMenu={handleClose} />
      </Menu>
    </>
  );
};

export default ActivityMenu;
