import { useScrollDisable } from '@/common/hooks';
import { Children } from '@/common/types';
import React from 'react';
import { useMainLayoutLoader, UseMainLayoutLoaderProps } from './useMainLayoutLoader';

type MainLayoutLoaderProps = UseMainLayoutLoaderProps &
  Children & {
    preventMount?: boolean;
  };

export const MainLayoutLoader = ({
  active,
  preventMount = true,
  children,
}: MainLayoutLoaderProps) => {
  useMainLayoutLoader({ active });

  useScrollDisable(active);

  if (active && preventMount) return null;

  return <>{children}</>;
};
