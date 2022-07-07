import React from 'react';
import { Drawer as HeadlessDrawer, DrawerProps as HeadlessDrawerProps } from '@/common/headless';

// Only support right placement to save effort
// Please adjust the code if it's time to have more placements
type DrawerProps = Omit<HeadlessDrawerProps, 'placement'>;

export const Drawer = ({ children, open }: DrawerProps) => {
  return (
    <HeadlessDrawer open={open} placement="right">
      <div className="w-[600px] h-screen bg-white shadow-lg">{children}</div>
    </HeadlessDrawer>
  );
};
