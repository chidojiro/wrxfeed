import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useApi } from '../../../api';
import { Activity } from '../../types';
import { ItemIcon, ItemText, MenuItem } from '../../../common/atoms/ContextMenu';
import { useConfirm } from '../../../confirm';
import { useErrorHandler } from '../../../error';
import { useRefreshActivityList } from '../../hooks';

interface DeleteActivityMenuItemProps {
  activity: Activity;
  closeMenu: () => void;
}

const DeleteActivityMenuItem: React.VFC<DeleteActivityMenuItemProps> = ({
  activity,
  closeMenu,
}) => {
  const apiUtils = useApi();
  const handleError = useErrorHandler();
  const confirm = useConfirm();
  const [, refreshActivityList] = useRefreshActivityList();
  const handleDelete = React.useCallback(async () => {
    try {
      closeMenu();
      const shouldDelete = await confirm();
      if (!shouldDelete) return;
      // Replcae with toastify
      toast.info('Removing...');
      await apiUtils.deleteActivity(activity.id);
      toast.success('Remove success!');
      refreshActivityList();
    } catch (error) {
      handleError(error);
    }
  }, [apiUtils, activity.id, confirm, handleError, closeMenu, refreshActivityList]);

  return (
    <MenuItem onClick={handleDelete}>
      <ItemIcon>
        <DeleteIcon fontSize="small" />
      </ItemIcon>
      <ItemText primary="Delete" />
    </MenuItem>
  );
};

export default DeleteActivityMenuItem;
