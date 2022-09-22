import { ConfirmModal } from '@/common/components';
import { useRole } from '@/role/useRole';

export type RemoveRoleModalProps = {
  open: boolean;
  onClose: () => void;
  roleId: number;
};

export const RemoveRoleModal = ({ open, onClose, roleId }: RemoveRoleModalProps) => {
  const { role } = useRole(roleId);

  if (!role) return null;

  const { name } = role;

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
