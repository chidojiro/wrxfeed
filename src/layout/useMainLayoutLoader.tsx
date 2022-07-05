import { Spinner } from '@/common/components';
import { useOverlay, UseOverlayProps } from '@/common/hooks';
import React from 'react';

export type UseMainLayoutLoaderProps = Pick<UseOverlayProps, 'active'>;

export const useMainLayoutLoader = (props: UseMainLayoutLoaderProps) => {
  return useOverlay({
    ...props,
    component: (
      <div className="absolute flex justify-center inset-0 bg-black/10">
        <Spinner />
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    asChildOf: document.querySelector('main')!,
  });
};
