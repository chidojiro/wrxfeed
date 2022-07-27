import { ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { TargetCard, TargetCardProps } from './TargetCard';
import { Target } from './types';

type TargetCardsProps = ClassName &
  Pick<TargetCardProps, 'onDeleteSuccess' | 'onUpdateSuccess'> & {
    targets: Target[];
  };

export const TargetCards = ({
  className,
  targets,
  onDeleteSuccess,
  onUpdateSuccess,
}: TargetCardsProps) => {
  return (
    <div className={clsx('mt-5 gap-4 grid grid-cols-1 lg:grid-cols-2', className)}>
      {targets.map((target) => (
        <TargetCard
          key={target.id}
          target={target}
          chartContainerClass="h-[184px]"
          // className="min-h-[330px]"
          onDeleteSuccess={onDeleteSuccess}
          onUpdateSuccess={onUpdateSuccess}
        />
      ))}
    </div>
  );
};
