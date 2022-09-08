import { AlertTriangleYellow, XIcon } from '@/assets';
import Modal from '@/common/atoms/Modal';
import { Button } from '@/common/components';

export type RemoveRoleModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onRemove: () => void;
  name?: string;
};

export const RemoveRoleModal = (props: RemoveRoleModalProps) => {
  const { open, onClose, onCancel, onRemove, name = 'N/A' } = props;

  return (
    <Modal contentClass="px-4 py-5" open={open} onClose={onClose}>
      <div className="flex justify-between space-x-4">
        <AlertTriangleYellow className="w-6 h-6 self-start" />
        <div className="max-w-sm space-y-3">
          <div className="space-y-1">
            <p className="text-sm leading-4 font-semibold tracking-tight text-Gray-2">
              Remove this role for {name}?
            </p>
            <p className="text-sm font-normal tracking-tight text-Gray-2">
              This will affect their view access and will prevent them from seeing some
              transactions.
            </p>
          </div>
          <div className="flex space-x-2 items-center">
            <Button onClick={onCancel}>
              <p className=" font-semibold text-sm leading-4 tracking-tight text-Gray-6">Cancel</p>
            </Button>
            <div className="h-[3px] w-[3px] bg-Neutral-Light rounded-full" />
            <Button onClick={onRemove}>
              <p className=" font-semibold text-sm leading-4 tracking-tight text-Accent-2">
                Remove
              </p>
            </Button>
          </div>
        </div>
        <XIcon onClick={onClose} className="w-4 h-4 hover:cursor-pointer" />
      </div>
    </Modal>
  );
};
