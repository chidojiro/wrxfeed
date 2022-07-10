import React from 'react';
import { Drawer as HeadlessDrawer, DrawerProps as HeadlessDrawerProps } from '@/common/headless';
import { useDelayableState, useOnClickOutside } from '@/common/hooks';
import clsx from 'clsx';

// Only support right placement to save effort
// Please adjust the code if it's time to have more placements
export type DrawerProps = Omit<HeadlessDrawerProps, 'placement'> & {
  onClose?: () => void;
};

export const Drawer = React.forwardRef(
  (
    { children, open: openProp, onClose }: DrawerProps,
    ref: React.ForwardedRef<HTMLDivElement | null>,
  ) => {
    const [open, setOpen] = useDelayableState(200, openProp);

    React.useEffect(() => {
      setOpen(!!openProp, !openProp);
    }, [openProp, setOpen]);

    const internalRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    useOnClickOutside(internalRef, onClose);

    if (!open) return null;

    return (
      <HeadlessDrawer open={open} placement="right" ref={internalRef}>
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
