import { classNames } from '@/common/utils';
import React from 'react';

interface LoadingProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const Loading: React.VFC<LoadingProps> = ({ width, height, className = '', color = 'primary' }) => {
  return (
    <div className={classNames('flex justify-center items-center', className)}>
      <div
        style={{ width: width ?? 32, height: height ?? 32 }}
        className={`animate-spin rounded-full h-2 w-2 border-b-2 border-${color}`}
      />
    </div>
  );
};

export default React.memo(Loading);
