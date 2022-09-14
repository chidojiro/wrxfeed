import { ConfirmModal } from '@/common/components';
import { Role } from './types';

export type RemoveRoleModalProps = {
  open: boolean;
  onClose: () => void;
  role: Role;
};

export const RemoveRoleModal = ({ open, onClose, role: { name } }: RemoveRoleModalProps) => {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={onClose}
      title={`Remove this role for ${name}?`}
      content="This will affect their view access and will prevent them from seeing some transactions."
      confirmButtonLabel="Remove"
    />
  );
};
