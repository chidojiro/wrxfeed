import React from 'react';
import clsx from 'clsx';

interface ExceedBarProps {
  className?: string;
  color?: string;
}

const ExceedBar: React.FC<ExceedBarProps> = ({ className = '' }) => {
  return (
    <div
      className={clsx(
        'space-x-1 flex flex-row items-center overflow-hidden',
        'zebra-stripes',
        className,
      )}
    />
  );
};

export default ExceedBar;
