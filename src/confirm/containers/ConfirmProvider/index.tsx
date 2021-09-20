import React from 'react';
import ConfirmDialog, { ConfirmDialogProps } from '../../molecules/ConfirmDialog';
import ConfirmContext from '../../contexts/ConfirmContext';
import { ConfirmDialogOptions, ConfirmFn } from '../../types';

const ConfirmProvider: React.FC = ({ children }) => {
  const [open, setIsOpen] = React.useState<boolean>(false);
  const [options, setDialogOptions] = React.useState<ConfirmDialogOptions | undefined>(undefined);
  const [handleCancel, setCancel] = React.useState<ConfirmDialogProps['onCancel']>(undefined);
  const [handleConfirm, setConfirm] = React.useState<ConfirmDialogProps['onConfirm']>(undefined);
  const confirm: ConfirmFn = React.useCallback((opt) => {
    return new Promise<boolean>((resolve) => {
      setIsOpen(true);
      setDialogOptions(opt);
      setCancel(() => () => {
        setIsOpen(false);
        resolve(false);
      });
      setConfirm(() => () => {
        setIsOpen(false);
        resolve(true);
      });
    });
  }, []);
  return (
    <>
      <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
      <ConfirmDialog
        open={open}
        options={options}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ConfirmProvider;
