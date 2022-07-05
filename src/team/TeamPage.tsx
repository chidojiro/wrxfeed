/* eslint-disable react-hooks/exhaustive-deps */
import * as Sentry from '@sentry/react';
import React from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from '@/common/templates/MainLayout';
import ListLoading from '@/main/atoms/ListLoading';
import { usePrimaryTarget } from '@/target/usePrimaryTarget';
import { PrimaryTarget } from './PrimaryTarget';
import { TargetSummary } from './TargetSummary';
import { TopCategories } from './TopCategories';
import { TransactionList } from './TransactionList';
import { TeamHeader } from './TeamHeader';

export const WrappedTeamPage: React.FC = () => {
  const { id: departmentIdParam } = useParams() as Record<string, string>;
  const departmentId = +departmentIdParam;
  const { data: target } = usePrimaryTarget(departmentId);

  return (
    <MainLayout
      mainClass="px-2 col-span-12 md:!col-span-9 !g:!col-span-9 xl:!col-span-9 !max-w-full"
      rightSide={false}
    >
      {!target ? (
        <ListLoading />
      ) : (
        <>
          <h1 className="sr-only">Department list</h1>
          <TeamHeader departmentId={departmentId} teamName={target?.department?.name} />
          <div className="grid grid-cols-9 gap-6 mt-6">
            <PrimaryTarget
              className="col-span-9 lg:col-span-5 h-[500px]"
              data={target}
              departmentId={departmentId}
            />
            <div className="col-span-9 lg:col-span-4 flex flex-col gap-6">
              {!!target.department && <TargetSummary departmentId={departmentId} />}
              <TopCategories />
            </div>
          </div>
          <TransactionList className="mt-6" />
        </>
      )}
    </MainLayout>
  );
};

export const TeamPage = Sentry.withProfiler(WrappedTeamPage, { name: 'TeamPage' });
