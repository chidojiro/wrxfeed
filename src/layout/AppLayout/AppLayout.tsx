import { Children } from '@/common/types';
import React from 'react';
import { Drawer } from './Drawer';

type AppLayoutProps = Children;

export const AppLayout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

AppLayout.Drawer = Drawer;
