import { ClassName } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';
import { Spinner } from '../Spinner';

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
  }, [loading]);

  return (
    <div
      className={clsx(
        StringUtils.withProjectClassNamePrefix('overlay-loader-container'),
        'relative overflow-hidden',
        className,
      )}
      style={{ borderRadius: childrenStyles?.borderRadius }}
    >
      {children}
      <div
        ref={ref}
        className={clsx(
          StringUtils.withProjectClassNamePrefix('overlay-loader'),
          'absolute z-[999] flex justify-center w-full h-full inset-0 bg-black/10',
          { hidden: !loading },
        )}
      >
        <Spinner />
      </div>
    </div>
  );
};
