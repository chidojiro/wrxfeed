import { Drawer as HeadlessDrawer, DrawerProps as HeadlessDrawerProps } from '@/common/headless';
import { useDelayableState, useOnEventOutside } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Button } from '../Button';

// Only support right placement to save effort
// Please adjust the code if it's time to have more placements
export type DrawerProps = Omit<HeadlessDrawerProps, 'placement'> &
  OpenClose & {
    closeOnClickOutside?: boolean;
    overlay?: boolean;
    showCloseButton?: boolean;
  };

export const Drawer = React.forwardRef<any, DrawerProps>(
  (
    { children, open: openProp, onClose, closeOnClickOutside, overlay, showCloseButton = true },
    ref,
  ) => {
    const [delayableOpen, setDelayableOpen] = useDelayableState({
      delayBy: 200,
      defaultState: openProp,
    });

    React.useEffect(() => {
      setDelayableOpen({ state: !!openProp, shouldDelay: !openProp });
    }, [openProp, setDelayableOpen]);

    const internalRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    useOnEventOutside('click', closeOnClickOutside && internalRef, onClose);

    if (!delayableOpen) return null;

    return (
      <HeadlessDrawer placement="right" ref={internalRef}>
        {overlay && <div className="fixed w-screen h-screen top-0 left-0"></div>}
        <div
          style={{ animationFillMode: 'forwards' }}
          className={clsx(
            'relative',
            'h-full w-[600px] pt-[56px] bg-white shadow-lg',
            openProp ? 'animate-drawer-enter' : 'animate-drawer-leave',
          )}
        >
          {showCloseButton && (
            <Button onClick={onClose} className="w-4 h-4 absolute right-4 top-18 z-50">
              <XIcon />
            </Button>
          )}
          {children}
        </div>
      </HeadlessDrawer>
    );
  },
);
Drawer.displayName = 'Drawer';
