import { AlertTriangleYellow, CheckCircleIcon } from '@/assets';
import Modal from '@/common/atoms/Modal';
import { Button } from '@/common/components';
import { OpenClose } from '@/common/types';
import React from 'react';

type Variant = 'alert' | 'success';

export type ConfirmModalProps = OpenClose & {
  title: React.ReactNode;
  content: React.ReactNode;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  icon?: React.ReactNode;
  variant?: Variant;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const IconByVariant: Record<Variant, React.ReactNode> = {
  alert: <AlertTriangleYellow className="w-6 h-6 self-start" />,
  success: <CheckCircleIcon className="text-[#36B37E] w-6 h-6 self-start" />,
};

export const ConfirmModal = ({
  open,
  title,
  content,
  onClose,
  onCancel,
  onConfirm,
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel = 'Confirm',
  variant,
}: ConfirmModalProps) => {
  const shouldShowCancelButton = !!onCancel;
  const shouldShowConfirmButton = !!onConfirm;
  return (
    <Modal contentClass="px-4 py-5" open={!!open} onClose={onClose} showCloseButton>
      <div className="flex justify-between space-x-4">
        {!!variant && IconByVariant[variant]}
        <div className="max-w-sm space-y-3">
          <div className="space-y-1">
            <p className="text-sm leading-4 font-semibold tracking-tight text-Gray-2">{title}</p>
            <p className="text-sm font-normal tracking-tight text-Gray-2 max-w-[90%]">{content}</p>
          </div>
          <div className="flex items-center gap-1">
            {shouldShowCancelButton && (
              <Button
                onClick={onCancel}
                variant="ghost"
                colorScheme="gray"
                size="sm"
                className="!text-sm px-1"
              >
                {cancelButtonLabel}
              </Button>
            )}
            {shouldShowCancelButton && shouldShowConfirmButton && (
              <div className="h-[3px] w-[3px] bg-Neutral-Light rounded-full" />
            )}
            {shouldShowConfirmButton && (
              <Button
                onClick={onConfirm}
                variant="ghost"
                colorScheme="purple"
                size="sm"
                className="!text-sm px-1"
              >
                {confirmButtonLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
