import { ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { Spinner } from '..';

export type OverlayLoaderProps = ClassName & {
  loading?: boolean;
  children: JSX.Element;
};

export const OverlayLoader = ({ loading, children, className }: OverlayLoaderProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [childrenStyles, setChildrenStyles] = React.useState<CSSStyleDeclaration>();

  React.useLayoutEffect(() => {
    if (loading && ref.current?.previousSibling) {
      setChildrenStyles(window.getComputedStyle(ref.current.previousSibling as any));
    }
  }, []);

  return (
    <div
      className={clsx('overlay-loader-container', 'relative overflow-hidden', className)}
      style={{ borderRadius: childrenStyles?.borderRadius }}
    >
      {children}
      <div
        ref={ref}
        className={clsx(
          'overlay-loader',
          'absolute z-[999] flex justify-center inset-0 bg-black/10',
          { hidden: !loading },
        )}
      >
        <Spinner />
      </div>
    </div>
  );
};
