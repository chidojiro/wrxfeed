import { Children } from '@/common/types';
import clsx from 'clsx';
import React from 'react';

export type FeedCardBadgeProps = Children & {
  style?: React.CSSProperties;
};

export const FeedCardBadge = ({ children, style }: FeedCardBadgeProps) => {
  return (
    <div
      className={clsx(
        'w-11 h-11 rounded-lg',
        'p-[1px]',
        'flex items-center justify-center',
        'absolute left-7 top-1/2 transform -translate-y-1/2',
      )}
      style={style}
    >
      <div className="bg-white rounded-lg w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
