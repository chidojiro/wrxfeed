import { Portal } from '@/common/components';
import { Children, OpenClose } from '@/common/types';
import React from 'react';

type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right';

export type DrawerProps = Children &
  Pick<OpenClose, 'open'> & {
    placement?: 'top' | 'bottom' | 'left' | 'right';
  };

const styleMap: Record<DrawerPlacement, React.CSSProperties> = {
  top: {
    width: '100vw',
    bottom: '0',
    left: '0',
  },
  bottom: {
    width: '100vw',
    top: '0',
    left: '0',
  },
  left: {
    height: '100vh',
    top: '0',
    left: '0',
  },
  right: {
    height: '100vh',
    top: '0',
    right: '0',
  },
};

export const Drawer = React.forwardRef(
  (
    { placement = 'right', children }: DrawerProps,
    ref: React.ForwardedRef<HTMLDivElement | null>,
  ) => {
    return (
      <Portal>
        <div
          ref={ref}
          style={{
            ...styleMap[placement],
            position: 'fixed',
            zIndex: 10,
          }}
        >
          {children}
        </div>
      </Portal>
    );
  },
);

Drawer.displayName = 'HeadlessDrawer';
