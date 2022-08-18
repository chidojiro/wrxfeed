import { Button } from '@/common/components';
import { Children } from '@/common/types';
import clsx from 'clsx';
import React from 'react';

type LoadMoreButtonProps = Children & {
  onClick?: () => void;
  disabled?: boolean;
};

export const LoadMoreButton = ({ onClick, children, disabled }: LoadMoreButtonProps) => {
  return (
    <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Button variant="text" size="sm" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};
