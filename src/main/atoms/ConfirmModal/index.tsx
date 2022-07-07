import { ReactComponent as CloseIcon } from '@/assets/icons/outline/close.svg';
import { ReactComponent as ExclamationCircle } from '@/assets/icons/solid/exclamation-circle.svg';
import Modal, { ModalProps } from '@/common/atoms/Modal';
import { Dialog } from '@headlessui/react';
import React, { useRef } from 'react';

interface ConfirmModalProps extends ModalProps {
  icon?: React.ReactNode;
  title: string;
  cancelLabel?: string;
  okLabel?: string;
  onOk?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  children,
  open,
  icon,
  title,
  cancelLabel,
  okLabel,
  onClose,
  onOk,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Modal initialFocus={cancelButtonRef} open={open} onClose={onClose}>
      <div className="px-4 py-5 sm:max-w-[400px] sm:w-full">
        <div className="flex items-center justify-between space-x-4">
          {icon || <ExclamationCircle />}
          <Dialog.Title as="h3" className="text-sm text-Gray-1 font-semibold flex-grow">
            {title}
          </Dialog.Title>
          <CloseIcon onClick={onClose} />
        </div>
        <div className="pl-10 pr-8 pt-1 space-y-3">
          {children}
          <div className="flex items-center space-x-2">
            <button
              ref={cancelButtonRef}
              type="button"
              className="text-sm font-semibold text-Gray-6 hover:underline"
              onClick={onClose}
            >
              {cancelLabel}
            </button>
            <div className="w-[3px] h-[3px] rounded-[1.5px] flex-grow-0 bg-Neutral-Light" />
            <button
              type="button"
              className="text-sm font-semibold text-purple-6 hover:underline"
              onClick={onOk}
            >
              {okLabel}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  icon: undefined,
  cancelLabel: 'Cancel',
  okLabel: 'OK',
  onOk: () => undefined,
};

export default React.memo(ConfirmModal);
