import { withProjectClassNamePrefix } from '../../utils';
import clsx from 'clsx';
import React from 'react';

export type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={clsx(
        withProjectClassNamePrefix('spinner'),
        'flex justify-center items-center',
        className,
      )}
    >
      <div className="animate-spin rounded-full border-b-2 border-Gray-3 w-8 h-8" />
    </div>
  );
};
