import { Children } from '@/common/types';
import clsx from 'clsx';
import React from 'react';

type LoadMoreButtonProps = Children & {
  onClick?: () => void;
  disabled?: boolean;
};

export const LoadMoreButton = ({ onClick, children, disabled }: LoadMoreButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'inline-block text-xs px-2',
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'bg-white',
        { 'cursor-default': disabled },
      )}
      type="button"
      onClick={onClick}
    >
      <div className={clsx({ disabled })}>{children}</div>
    </button>
  );
};
