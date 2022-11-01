import { Button } from '@/common/components';
import { Children } from '@/common/types';
import clsx from 'clsx';
import React from 'react';

type LoadMoreButtonProps = Children & {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const LoadMoreButton = ({
  onClick,
  children,
  disabled,
  className = '',
}: LoadMoreButtonProps) => {
  return (
    <div
      className={clsx(
        'bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        className,
      )}
    >
      <Button variant="text" size="sm" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};
