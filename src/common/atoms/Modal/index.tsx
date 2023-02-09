import { XIcon } from '@/assets';
import { Portal } from '@/common/components';
import { useDelayableState, useScrollDisable } from '@/common/hooks';
import clsx from 'clsx';
import React, { MutableRefObject } from 'react';

export interface ModalProps {
  children?: React.ReactNode;
  initialFocus?: MutableRefObject<HTMLElement | null>;
  open: boolean;
  onClose?: () => void;
  center?: boolean;
  contentClass?: string;
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  stopPropagation?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  initialFocus,
  open,
  onClose,
  center = true,
  contentClass,
  showCloseButton,
  closeOnClickOutside,
  stopPropagation,
}) => {
  const [delayableOpen, setDelayableOpen] = useDelayableState({ delayBy: 0, defaultState: open });

  React.useEffect(() => {
    setDelayableOpen({ state: !!open, shouldDelay: !open });
  }, [open, setDelayableOpen]);

  useScrollDisable(delayableOpen);

  React.useEffect(() => {
    if (delayableOpen) {
      initialFocus?.current?.focus();
    }
  }, [delayableOpen, initialFocus]);

  if (!delayableOpen) return null;

  return (
    <Portal>
      <div className={clsx('fixed z-40 inset-0', open ? 'animate-modal-enter' : '')}>
        <div
          className="relative flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeOnClickOutside ? onClose : undefined}
          ></div>
          {/* This element is to trick the browser into centering the modal contents. */}
          {center && (
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
          )}
          <div
            className={clsx(
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              'inline-block bg-white rounded-sm text-left shadow-xl transform transition-all',
              'max-h-[95vh] lg:max-h-[75vh] overflow-auto',
              contentClass,
            )}
          >
            {showCloseButton && (
              <XIcon
                onClick={onClose}
                className="w-4 h-4 hover:cursor-pointer absolute top-6 right-4"
              />
            )}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
