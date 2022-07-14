import clsx from 'clsx';
import React from 'react';

interface LoadingProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ width, height, className = '', color = 'primary' }) => {
  return (
    <div className={clsx('flex justify-center items-center', className)}>
      <div
        style={{ width: width ?? 32, height: height ?? 32 }}
        className={`animate-spin rounded-full h-2 w-2 border-b-2 border-${color}`}
      />
    </div>
  );
};

export default React.memo(Loading);
