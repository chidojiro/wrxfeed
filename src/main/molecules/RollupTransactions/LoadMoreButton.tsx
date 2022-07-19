import { Children } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

type LoadMoreButtonProps = Children & {
  onClick?: () => void;
};

export const LoadMoreButton = ({ onClick, children }: LoadMoreButtonProps) => {
  return (
    <button
      className={clsx(
        StringUtils.withProjectClassNamePrefix('infinite-loader', 'infinite-loader--on-demand'),
        'inline-block text-xs px-2',
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'bg-white',
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
