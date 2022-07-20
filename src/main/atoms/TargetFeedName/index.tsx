import clsx from 'clsx';
import { getTargetName } from '@/main/utils';
import { Target } from '@/target/types';
import React from 'react';

export interface TargetFeedNameProps {
  className?: string;
  target: Target;
}

const TargetFeedName: React.FC<TargetFeedNameProps> = ({ className = '', target }) => {
  return (
    <div className={clsx('group relative', className)}>
      <p className="text-base text-primary text-left font-bold line-clamp-1 overflow-ellipsis">
        {getTargetName(target)}
      </p>
    </div>
  );
};

export default TargetFeedName;
