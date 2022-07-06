import { ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { Spinner } from '..';

export type OverlayLoaderProps = ClassName & {
  loading?: boolean;
  children: JSX.Element;
  rounded?: string;
};

export const OverlayLoader = ({
  loading,
  children,
  className,
  rounded = 'rounded-card',
}: OverlayLoaderProps) => {
  return (
    <div className={clsx('overlay-loader-container', 'relative', className)}>
      {children}
      {!!loading && (
        <div
          className={clsx(
            'overlay-loader',
            'absolute z-[999] flex justify-center inset-0 bg-black/10',
            rounded,
          )}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};
