/* eslint-disable react-hooks/exhaustive-deps */
import MainLayout from '@/common/templates/MainLayout';
import { usePrimaryTarget } from '@/main/hooks/primaryTarget.hook';
import * as Sentry from '@sentry/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PrimaryTarget } from '../PrimaryTarget';
import { TargetSummary } from '../TargetSummary';
import { TopCategories } from '../TopCategories';
import { TransactionList } from '../TransactionList';

export const WrappedTeamPage: React.FC = () => {
  const { data: target, mutate } = usePrimaryTarget();

  const { id: departmentIdParam } = useParams() as Record<string, string>;

  const departmentId = +departmentIdParam;

  if (!target) return null;

  return (
    <MainLayout
      mainClass="px-2 col-span-12 md:!col-span-9 !g:!col-span-9 xl:!col-span-9 !max-w-full"
      rightSide={false}
    >
      <h1 className="sr-only">Department list</h1>
      <div className="grid grid-cols-9 gap-6">
        <PrimaryTarget
          className="col-span-9 lg:col-span-5"
          data={target}
          onDeleteSuccess={mutate}
        />
        <div className="col-span-9 lg:col-span-4 flex flex-col gap-6">
          {!!target.department && <TargetSummary department={target.department} />}
          <TopCategories departmentId={departmentId} />
        </div>
      </div>
      <TransactionList departmentId={departmentId} className="mt-6" />
    </MainLayout>
  );
};

export const TeamPage = Sentry.withProfiler(WrappedTeamPage, { name: 'TeamPage' });
