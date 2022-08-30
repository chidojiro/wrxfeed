import { useDelayableState, useScrollDisable } from '@/common/hooks';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';
import React, { MutableRefObject } from 'react';
import { noop } from 'lodash-es';

export interface ModalProps {
  children?: React.ReactNode;
  initialFocus?: MutableRefObject<HTMLElement | null>;
  open: boolean;
  onClose: () => void;
  center?: boolean;
  contentClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  initialFocus,
  open,
  onClose,
  center = true,
  contentClass = '',
}) => {
  const [delayableOpen, setDelayableOpen] = useDelayableState({ delayBy: 200, defaultState: open });

  React.useEffect(() => {
    setDelayableOpen({ state: !!open, shouldDelay: !open });
  }, [open, setDelayableOpen]);

  useScrollDisable(delayableOpen);

  if (!delayableOpen) return null;

  return (
    <Dialog
      as="div"
      className={clsx('fixed z-50 inset-0', open ? 'animate-modal-enter' : 'animate-modal-leave')}
      initialFocus={initialFocus}
      open={open}
      onClose={noop}
    >
      <div className="relative flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
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
          {children}
        </div>
      </div>
    </Dialog>
  );
};

export default React.memo(Modal);
