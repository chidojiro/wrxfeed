import React from 'react';
import { classNames } from '@common/utils';

interface ExceedBarProps {
  className?: string;
  color?: string;
}

const ExceedBar: React.VFC<ExceedBarProps> = ({ className = '', color }) => {
  const renderDashed = (item: number, index: number) => {
    return (
      <div key={`ExceedBar-${item}-${index}`} className="w-px h-24 bg-white rotate-40">
        <div />
      </div>
    );
  };
  return (
    <div
      className={classNames(
        'bg-red-500 space-x-1 flex flex-row items-center overflow-hidden',
        className,
      )}
      style={{
        backgroundColor: color,
      }}
    >
      {Array(30).fill(0).map(renderDashed)}
    </div>
  );
};

export default ExceedBar;
