import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ConfirmDialogOptions } from '../types';

const DEFAULT_OPTIONS: ConfirmDialogOptions = {
  title: 'Are you sure?',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
};

export interface ConfirmDialogProps {
  open: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  options?: ConfirmDialogOptions;
}

const ConfirmDialog: React.VFC<ConfirmDialogProps> = ({ open, options, onCancel, onConfirm }) => {
  const {
    title,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  } = { ...DEFAULT_OPTIONS, ...options };

  return (
    <Dialog keepMounted {...dialogProps} open={open} onClose={onCancel}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      <DialogActions>
        <Button {...cancellationButtonProps} onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
