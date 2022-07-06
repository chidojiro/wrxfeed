import { OverlayLoader } from '@/common/components';
import { ClassName } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { targetFallback } from './constants';
import { TargetCard } from './TargetCard';
import { useTargets } from './useTargets';

type AllCompanyTargetProps = ClassName;

export const AllCompanyTarget = ({ className }: AllCompanyTargetProps) => {
  const { data: targets = [targetFallback], isInitializing } = useTargets({ type: 'company' });

  return (
    <OverlayLoader loading={isInitializing} className={className}>
      <TargetCard className={clsx('h-[450px]')} data={targets[0]} />
    </OverlayLoader>
  );
};
