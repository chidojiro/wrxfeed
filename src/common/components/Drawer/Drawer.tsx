import { Drawer as HeadlessDrawer, DrawerProps as HeadlessDrawerProps } from '@/common/headless';
import { useDelayableState, useOnClickOutside } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import clsx from 'clsx';
import React from 'react';

// Only support right placement to save effort
// Please adjust the code if it's time to have more placements
export type DrawerProps = Omit<HeadlessDrawerProps, 'placement'> & OpenClose;

export const Drawer = React.forwardRef<any, DrawerProps>(
  ({ children, open: openProp, onClose }, ref) => {
    const [delayableOpen, setDelayableOpen] = useDelayableState(200, openProp);

    React.useEffect(() => {
      setDelayableOpen(!!openProp, !openProp);
    }, [openProp, setDelayableOpen]);

    const internalRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    useOnClickOutside(internalRef, onClose);

    if (!delayableOpen) return null;

    return (
      <HeadlessDrawer placement="right" ref={internalRef}>
        <div
          style={{ animationFillMode: 'forwards' }}
          className={clsx(
            'h-full w-[600px] bg-white shadow-lg',
            openProp ? 'animate-drawer-enter' : 'animate-drawer-leave',
          )}
        >
          {children}
        </div>
      </HeadlessDrawer>
    );
  },
);
Drawer.displayName = 'Drawer';
