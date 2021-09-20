import { DialogProps } from '@mui/material/Dialog';
import { ButtonProps } from '@mui/material/Button';

export interface ConfirmFn {
  (options?: ConfirmDialogOptions): Promise<boolean>;
}

export interface ConfirmDialogOptions {
  title?: React.ReactNode;
  content?: React.ReactNode;
  confirmationText?: React.ReactNode;
  cancellationText?: React.ReactNode;
  dialogProps?: Omit<DialogProps, 'open'>;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
}
