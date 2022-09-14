import { StringUtils } from '../../utils';
import clsx from 'clsx';
import React from 'react';

export type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const spinnerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const color = window.getComputedStyle(wrapperRef.current).color;

    spinnerRef.current?.style.setProperty('border-color', color || '#374151');
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('spinner'),
        'flex justify-center items-center w-8 h-8 max-w-full max-h-full',
        className,
      )}
    >
      <div ref={spinnerRef} className="animate-spin rounded-full border-b-2 w-full h-full" />
    </div>
  );
};
