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
      <div className="invisible group-hover:visible absolute bottom-8 left-0">
        <div className="bg-primary p-2 rounded-sm">
          <p className="text text-white text-2xs font-semibold z-30">{getTargetName(target)}</p>
        </div>
        <svg
          className="absolute text-primary h-2 right-8 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};

export default TargetFeedName;
