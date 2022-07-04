import { ClassName } from '@/common/types';
import ListLoading from '@/main/atoms/ListLoading';
import clsx from 'clsx';
import React from 'react';
import { TargetCard } from './TargetCard';
import { useTargets } from './useTargets';

type AllCompanyTargetProps = ClassName;

export const AllCompanyTarget = ({ className }: AllCompanyTargetProps) => {
  const { data: targets = [], isInitializing } = useTargets({ type: 'company' });

  if (isInitializing) return <ListLoading />;

  return (
    <TargetCard
      className={clsx('h-[450px]', className)}
      data={targets[0]}
      showMoreOptionsButton={false}
    />
  );
};
