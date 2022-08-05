import { OverlayLoader } from '@/common/components';
import { MainLayout } from '@/layout/MainLayout';
import { TargetCard } from '@/target/TargetCard';
import { usePrimaryTarget } from '@/target/usePrimaryTarget';
import React from 'react';
import { useParams } from 'react-router-dom';
import { TeamHeader } from './TeamHeader';
import { TeamTargetSummary } from './TeamTargetSummary';
import { TopCategories } from './TopCategories';
import { TransactionList } from './TransactionList';

export const TeamPage = () => {
  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = +departmentIdParam;
  const { data: target, isValidating: isValidatingTarget, mutate } = usePrimaryTarget(departmentId);

  return (
    <MainLayout
      mainClass="px-2 col-span-12 md:!col-span-9 !g:!col-span-9 xl:!col-span-9 !max-w-full"
      rightSide={false}
    >
      <h1 className="sr-only">Department list</h1>
      <TeamHeader departmentId={departmentId} />
      <div className="grid grid-cols-9 gap-6 mt-6">
        <OverlayLoader loading={isValidatingTarget} className="col-span-9 lg:col-span-5">
          <TargetCard
            className="h-full"
            target={target}
            showColorfulHeading={false}
            onUpdateSuccess={(target) => mutate([target])}
            onDeleteSuccess={() => mutate()}
          />
        </OverlayLoader>
        <div className="col-span-9 lg:col-span-4 flex flex-col gap-6">
          <TeamTargetSummary departmentId={departmentId} />
          <TopCategories />
        </div>
      </div>
      <TransactionList className="mt-6" />
    </MainLayout>
  );
};
