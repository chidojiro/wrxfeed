import { OverlayLoader } from '@/common/components';
import { ClassName } from '@/common/types';
import React from 'react';
import { fallbackTarget } from './constants';
import { TargetCard } from './TargetCard';
import { useTargets } from './useTargets';

type AllCompanyTargetProps = ClassName;

export const AllCompanyTarget = ({ className }: AllCompanyTargetProps) => {
  const { data: targets = [fallbackTarget], isInitializing } = useTargets({ type: 'company' });

  return (
    <OverlayLoader loading={isInitializing} className={className}>
      <TargetCard className="h-[450px]" data={targets[0]} />
    </OverlayLoader>
  );
};
