import React from 'react';
import { classNames } from '@/common/utils';

interface ExceedBarProps {
  className?: string;
  color?: string;
}

const ExceedBar: React.VFC<ExceedBarProps> = ({ className = '' }) => {
  return (
    <div
      className={classNames(
        'space-x-1 flex flex-row items-center overflow-hidden',
        'zebra-stripes',
        className,
      )}
    />
  );
};

export default ExceedBar;
