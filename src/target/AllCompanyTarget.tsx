import React from 'react';
import { OverlayLoader } from '@/common/components';
import { ClassName } from '@/common/types';
import { fallbackTarget } from './constants';
import { TargetCard } from './TargetCard';
import { useTargets } from './useTargets';

type AllCompanyTargetProps = ClassName;

export const AllCompanyTarget = ({ className }: AllCompanyTargetProps) => {
  const {
    data: targets = [fallbackTarget],
    isInitializing,
    mutate,
  } = useTargets({ type: 'company', limit: 1 });

  return (
    <OverlayLoader loading={isInitializing} className={className}>
      {Array.isArray(targets) && targets.length > 0 ? (
        <TargetCard
          className="h-[450px]"
          target={targets[0]}
          hidePropertyDropdowns
          onUpdateSuccess={(target) => mutate([target])}
          onDeleteSuccess={() => mutate()}
          deletable={false}
          url={`/departments/${targets[0]?.department?.id}`}
        />
      ) : (
        <div />
      )}
    </OverlayLoader>
  );
};
