import { classNames } from '@main/utils';
import React from 'react';

interface LoadingProps {
  width?: number;
  height?: number;
  className?: string;
}

const Loading: React.VFC<LoadingProps> = ({ width, height, className = '' }) => {
  return (
    <div className=" flex justify-center items-center">
      <div
        style={{ width: width ?? 32, height: height ?? 32 }}
        className={classNames(
          'animate-spin rounded-full h-2 w-2 border-b-2 border-primary',
          className,
        )}
      />
    </div>
  );
};

export default React.memo(Loading);
